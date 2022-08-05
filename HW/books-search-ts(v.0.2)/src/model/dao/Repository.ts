import Identifiable, { IdType } from "../../Shared.js";

export interface Repositry<T extends Identifiable> {
    getAll():Promise<Map<IdType,T>>
    getById(id:IdType):Promise<T>,
    getByQuery(q:string):Promise<Map<IdType,T|T[]>>,
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    deleteById(id: IdType): Promise<any>;
    count(): number;
    endpoint:string;
}
export class RepositoryImpl<T extends Identifiable> implements Repositry<T>{
    constructor(public endpoint:string) {
        
    }
   async getByQuery(q:string):Promise<Map<IdType,T|T[]>>{
    let returnMap = new Map<IdType, T>()
    try {
        const p = await fetch(q);
        const entities = await p.json(); 
        entities.map((entity:T) => {
            returnMap.set(entity.id,entity)
        })
    }
   catch(err) {
        console.log(err);
    }
    return returnMap;
    } 

   async getAll(): Promise<Map<IdType,T>> {
        let returnMap = new Map<IdType, T>()
        try {
            const p = await fetch(this.endpoint);
            const entities = await p.json(); 
            entities.map((entity:T) => {
                returnMap.set(entity.id,entity)
            })
        }
       catch(err) {
            console.log(err);
        }
        return returnMap;
        } 

   async getById(id: IdType): Promise<T> {
    let result = new Promise<T>(()=>{}).finally();
        try {
            const p = await fetch(`${this.endpoint}/${id}`);
            const entities = await p.json();
            result = entities;
        } 
        catch (err) {console.log(err);}
        return result;
    }
   async create(entity: T): Promise<T> {
        let newEntity = entity;
        try {
            const p = await fetch(this.endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(entity),
          })
          newEntity = await p.json();
          
        } 
        catch (err) {
            console.log(err)
        }
        return newEntity;
    }
    async update(entity: T): Promise<T> {
        const p = await fetch(`${this.endpoint}/${entity.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(entity),
          });
          const response = await p.json();
          return response;
    }
    async deleteById(id: IdType): Promise<any> {
        const p = await fetch(`${this.endpoint}/${id}`, {
            method: "DELETE"})
        const r = await p.json();
        return r;
    }
    count(): number {
        throw new Error("Method not implemented.");
    }

}