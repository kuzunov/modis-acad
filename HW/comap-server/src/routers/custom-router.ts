import * as express from 'express';
import { getJsonFromFile, sendErrorResponse, writeJsonToFile } from '../utils/utils';
import * as indicative from 'indicative';
import { v4 as uuidv4 } from 'uuid';
import { entities, Identifiable, IdType } from '../model/sharedTypes';
import { Router } from 'express';
import { IComment } from '../model/comment';
import childRouter from './modifyChildRouter';

type customRouterType = <T>(dbFile:string,
    entityName:entities,
    childRouter?:boolean,
    validationSchema?:any, // fix with type
    )=> Router;


const customRouter:customRouterType = <T extends Identifiable<IdType>>(dbFile,entityName,childRouter=false,validationSchema:{id:any,entity:any,entityToDelete:any,childEntity:any}) => {
    const router = (childRouter)?express.Router({mergeParams:true}):express.Router();
    router
    .get('/', async (req, res,next) => {
        if(childRouter) {return next()}
        try {
            const entities = await getJsonFromFile<T[]>(dbFile);
            res.json(entities);
        } catch (err) {
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    })
    .get((childRouter)?'/:childid':'/:parentid', async (req:express.Request<{parentid:string,childid:string}>,res) => {
        try{
            const params = req.params;
            const idToCheck = (childRouter)?params.childid:params.parentid
            await indicative.validator.validate(idToCheck, (childRouter)?validationSchema.childEntity:validationSchema.id);
            const entities = await getJsonFromFile<T[]>(dbFile);
            const entity:T = entities.find(entity => entity.id === idToCheck);
            (entity)?res.json(entity):sendErrorResponse(req,res,404,`Entity ${params.parentid} not found`,new Error())
        }
        catch(err){
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`,err);
        }
    })
    .post('/',async (req,res,next)=> {
        if(childRouter) {return next()}
        const entity = req.body;
        try{
            await indicative.validator.validate(entity,validationSchema.entity);
            const entities = await getJsonFromFile<T[]>(dbFile);
            entity.id = uuidv4();
            entity.created = Date.now();
            entity.modified = Date.now();
            entities.push(entity);
            try {
                writeJsonToFile(dbFile,entities)
                res.json(entity);
            } catch (err) {
                console.error(`Unable to create ${entityName}: ${entity.id}.`);
                console.error(err);
                sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
            }
        } catch (err){
            sendErrorResponse(req, res, 400, `Invalid ${entityName} data: ${err.message}`, err);
        }
    })
    .put('/', async (req, res)=> {
        const entity = req.body;
        console.log(entity);
        try {
            await indicative.validator.validate(entity,validationSchema.entity)
            const entities = await getJsonFromFile<T[]>(dbFile);
            entity.modified = Date.now();
            entities.splice(entities.findIndex(dbEntity => dbEntity.id ===entity.id),1,entity);
            try {
                writeJsonToFile(dbFile,entities);
                res.json(entity);
            } catch(err){
                console.error(`Unable to update ${entityName}: ${entity.id}.`);
                console.error(err);
                sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
            }
        } catch (err) {
            sendErrorResponse(req, res, 400, `Invalid ${entityName} data: ${err.message}`, err);
        }
    })
    .delete('/',async (req,res) => {
        const entity = req.body;
        try {
            await indicative.validator.validate(entity,validationSchema.entityToDelete)
            const entities = await getJsonFromFile<T[]>(dbFile);
            const indexToDelete = entities.findIndex(dbEntity => dbEntity.id ===entity.id);
            const deletedEntity = entities[indexToDelete];
            entities.splice(indexToDelete,1);
            try {
                writeJsonToFile(dbFile,entities);
                res.json(deletedEntity);
            } catch(err){
                console.error(`Unable to delete ${entityName}: ${entity.id}.`);
                console.error(err);
                sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
            }
        } catch (err) {
            sendErrorResponse(req, res, 400, `Invalid ${entityName} data: ${err.message}`, err);
        }
    });
    return router;
};

export default customRouter;
// Posts API Feature
