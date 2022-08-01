import Identifiable, { IdType } from "../model/Shared";

interface Repositry<T extends Identifiable> {
    getAll():Map<IdType,T>
    getById(id:IdType):T,
    getByQuery(q:string):Promise<Map<string,T>>,
    create(entity: T): T;
    update(entity: T): T;
    deleteById(id: IdType): void;
    count(): number;
}
class RepositoryImpl<T extends Identifiable> implements Repositry<T>{
   async getByQuery(q:string):Promise<Map<string,T>>{
    }
    getAll(): Map<IdType,T> {
        throw new Error("Method not implemented.");
    }

    getById(id: IdType): T {
        throw new Error("Method not implemented.");
    }
    create(entity: T): T {
        throw new Error("Method not implemented.");
    }
    update(entity: T): T {
        throw new Error("Method not implemented.");
    }
    deleteById(id: IdType): void {
        throw new Error("Method not implemented.");
    }
    count(): number {
        throw new Error("Method not implemented.");
    }

}