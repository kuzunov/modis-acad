import { Identifiable, IdType } from "./shared-types";
import Todo from "./todo-model";

const API_BASE_URL = 'http://localhost:4000/api';



export interface ApiClient<K,V extends Identifiable<K>> {
    findAll(): Promise<V[]>;
    findById(id: K): Promise<V>;
    create(entityWithoutId: Partial<V>): Promise<V>;
    update(entity: V): Promise<V>;
    deleteById(id: K): Promise<V>;

}

export class ApiClientImpl<K, V extends Identifiable <K>> implements ApiClient<K,V> {
    constructor(public apiCollectionSuffix:string) {

    }
    
    findAll(): Promise<V[]> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`)
    }
    findById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`)
    }
    create(entityWithoutId: Partial<V>): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entityWithoutId),
        })
    }
    update(entity: V): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${entity.id}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entity),
        })
    }
    deleteById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`, {
            method:'DELETE',
        })
    }
    private async handleRequest(url: string,options?: RequestInit){
        try {
            const response = await fetch(url, options);
            if (response.status >= 400) {
                return Promise.reject(response.body);
            }
            return response.json();
        }
        catch (err) {
            return Promise.reject(err);

        }
    }
}

export const TodosApi:ApiClient<IdType,Todo> = new ApiClientImpl('todos');
