import * as express from 'express';
import { sendErrorResponse} from '../utils/utils';
import * as indicative from 'indicative';
import { v4 as uuidv4 } from 'uuid';
import { entities, Identifiable, IdType } from '../model/sharedTypes';
import { Router } from 'express';
import { IComment } from '../model/comment';
import childRouter from './modifyChildRouter';
import { getJsonFromFile, writeJsonToFile } from '../dao/entity-repository';
import { IRepository } from '../dao/repository';

type customRouterType = <T extends Identifiable<IdType>>(
    repo:IRepository<T>,
    entityName:entities,
    childRouter?:boolean,
    validationSchema?:{id:any,entity:any,entityToDelete:any,childEntity:any}, // fix with type
    ) => Router;


const customRouter:customRouterType = <T>(repo:IRepository<T>, entityName,childRouter=false,validationSchema) => {
    const router = (childRouter)?express.Router({mergeParams:true}):express.Router();
    router
    .get('/', async (req, res,next) => {
        if(childRouter) {return next()}
        try {
            const entities = await repo.findAll();
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
            const entity = await repo.findById(idToCheck);
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
            try {
                const returnEntity = await repo.create(entity)
                res.status(201).json(returnEntity);
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
        try {
            await indicative.validator.validate(entity,validationSchema.entity)
            try {
                const entityToReturn = await repo.update(entity);
                res.json(entityToReturn)
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
            try {
                const deletedEntity = await repo.deleteById(entity.id);
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
