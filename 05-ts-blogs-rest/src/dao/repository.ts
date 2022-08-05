import Identifiable, { IdType } from "../model/shared-types.js";
import { IdGenerator } from "../model/id-generator.js";
export interface Repository<T extends Identifiable> {
    findAll(): T[];
    findById(id: IdType): T|undefined;
    create(entity: T): T;
    update(entity: T): T;
    deleteById(id: IdType): T;
    count(): number;

}

export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
    private entities = new Map<IdType,T>();
    constructor(private idGen: IdGenerator<IdType>) {

    }
    
    findAll(): T[] {
        return Array.from(this.entities.values());
    }
    findById(id: IdType): T|undefined {
        return this.entities.get(id);
    }
    create(entity: T): T {
        entity.id = this.idGen.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity: T): T {
        const old = this.findById(entity.id);
        if (old){throw new Error("No entity with that ID")}
        this.entities.set(entity.id,entity);
        return entity;
    }
    deleteById(id: number): T {
        const old = this.findById(id);
        if(old === undefined){
            throw new Error("No entity")
        } else {
            this.entities.delete(id)
            return old;
        }
    }
    count(): number {
        throw new Error("Method not implemented.");
    }
    
}