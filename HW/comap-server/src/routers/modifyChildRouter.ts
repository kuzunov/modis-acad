import * as express from 'express';
import {sendErrorResponse} from '../utils/utils';
import * as indicative from 'indicative';
import { v4 as uuidv4 } from 'uuid';
import { ChildEntity, IdType } from '../model/sharedTypes';
import { getJsonFromFile, writeJsonToFile } from '../dao/entity-repository';


const modifyChildRouter = <T extends ChildEntity<IdType>>(router:express.Router, dbFile,validationSchema:{id:any,entity:any,entityToDelete:any}) => {
    router
    .get('/', async (req:express.Request<{parentid:string}>, res) => {
        try {
            const entities = await getJsonFromFile<T[]>(dbFile);
            res.json(entities.filter(childEntity => childEntity.parentEntityId === req.params.parentid));
        } catch (err) {
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    })
    .post('/',async (req:express.Request<{parentid:string,childid:string}>,res)=> {
        const entity:ChildEntity<IdType> = req.body;
        try{
            await indicative.validator.validate(entity,validationSchema.entity)
            const params = req.params;
            await indicative.validator.validate(params, { parentid: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' });
            const entities = await getJsonFromFile<ChildEntity<IdType>[]>(dbFile);
            entity.id = uuidv4();
            entity.parentEntityId = params.parentid;
            entity.created = Date.now();
            entity.modified = Date.now();
            entities.push(entity);
            try {
                writeJsonToFile(dbFile,entities)
                res.status(201).json(entity);
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
