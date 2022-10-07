import { promises } from "fs"
import { IComment } from "../model/comment"
import { IEvent } from "../model/event"
import { IOrganization } from "../model/organization"
import { IPlace } from "../model/place"
import { IReview } from "../model/review"
import { Identifiable, IdType } from "../model/sharedTypes"
import { IUser } from "../model/user"
import { v4 as uuidv4 } from 'uuid';


export interface IRepository<T> {
    create(entity:T):Promise<T>
    update(entity:T):Promise<T>
    deleteById(id:IdType):Promise<T>
    findAll():Promise<T[]>
    findById(id:IdType):Promise<T>
    count(entity:T):Promise<number>
}

export class RepositoryImpl<T extends Identifiable<IdType>> implements IRepository<T> {
    constructor(private dbFile:string){}

    async create(entity: T): Promise<T> {
        const entities = await this.findAll();
        entity.id = uuidv4();
        entity.created = Date.now();
        entity.modified = Date.now();
        entities.push(entity)
        this.writeJsonToFile(entities);
        return entity;
    }
    async update(entity: T): Promise<T> {
        const entities = await this.findAll();
        const index = entities.findIndex(entityToUpdate => entity.id === entityToUpdate.id);
        entity.modified = Date.now();
        entities[index] = entity;
        this.writeJsonToFile(entities);
        return entity;

    }
    async deleteById(id: string): Promise<T> {
        const entities = await this.findAll();
        const indexToDelete = entities.findIndex(dbEntity => dbEntity.id === id);
        if (indexToDelete <0) {throw new Error();}
        const deletedEntity = entities[indexToDelete];
        entities.splice(indexToDelete,1);
        this.writeJsonToFile(entities)
        return deletedEntity;
    }
    async findAll(): Promise<T[]> {
        return await this.getJsonFromFile();   
    }
    async findById(id: string): Promise<T> {
        const entities = await this.getJsonFromFile();
        const entity:T = entities.find(entity => entity.id === id);
        return entity;
    }
    async count(): Promise<number> {
        const entities = await this.getJsonFromFile();
        return entities.length;
    }

    private getJsonFromFile = async () => {
        const fileData = await promises.readFile(this.dbFile)
        const JSONentity = JSON.parse(fileData.toString());
        return JSONentity;
    }
    private writeJsonToFile = async (entity) => {
        promises.writeFile(this.dbFile, JSON.stringify(entity));
    }

}

export const EventsRepository = new RepositoryImpl<IEvent>(process.env.DB_FOLDER+process.env.EVENTS_DB);
export const OrganizationsRepository = new RepositoryImpl<IOrganization>(process.env.DB_FOLDER+process.env.ORGANIZATIONS_DB);
export const UsersRepository = new RepositoryImpl<IUser>(process.env.DB_FOLDER+process.env.USERS_DB);
export const PlacesRepository = new RepositoryImpl<IPlace>(process.env.DB_FOLDER+process.env.PLACES_DB);
export const ReviewsRepository = new RepositoryImpl<IReview>(process.env.DB_FOLDER+process.env.REVIEWS_DB);
export const CommentsRepository = new RepositoryImpl<IComment>(process.env.DB_FOLDER+process.env.COMMENTS_DB);