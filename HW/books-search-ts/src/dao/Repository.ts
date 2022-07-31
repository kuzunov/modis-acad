import { IdType } from "../model/Shared";

interface Repositry<T> {
    getAll():Map<IdType,T>
    getById(id:IdType):T,
    create(entity: T): T;
    update(entity: T): T;
    deleteById(id: IdType): void;
    count(): number;
}
class RepositoryImpl<T> implements Repositry<T>{
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