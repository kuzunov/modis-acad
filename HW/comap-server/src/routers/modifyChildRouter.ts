import * as express from 'express';
import { getJsonFromFile, sendErrorResponse, writeJsonToFile } from '../utils/utils';
import * as indicative from 'indicative';
import { v4 as uuidv4 } from 'uuid';
import { ChildEntity, entities, Identifiable, IdType } from '../model/sharedTypes';
import { Router } from 'express';
import { IComment } from '../model/comment';


const modifyChildRouter = <T extends ChildEntity<IdType>>(router:express.Router, dbFile) => {
    router.get('/', async (req:express.Request<{parentid:string}>, res) => {
        try {
            const entities = await getJsonFromFile<T[]>(dbFile);
            res.json(entities.filter(childEntity => childEntity.parentEntityId === req.params.parentid));
        } catch (err) {
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    }).post('/',async (req:express.Request<{parentid:string}>,res)=> {
        const entity:ChildEntity<IdType> = req.body;
        try{
            // ADD SCHEMA for validation
            // await indicative.validator.validate(entity,validationSchema);
            const entities = await getJsonFromFile<ChildEntity<IdType>[]>(dbFile);
            entity.id = uuidv4();
            entity.parentEntityId = req.params.parentid;
            entities.push(entity);
            try {
                writeJsonToFile(dbFile,entities)
                res.json(entity);
            } catch (err) {
                console.error(`Unable to create entity: ${entity.id}.`);
                console.error(err);
                sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
            }
        } catch (err){
            sendErrorResponse(req, res, 400, `Invalid data: ${err.message}`, err);
        }
    })
    return router;
};

export default modifyChildRouter;
// Posts API Feature
