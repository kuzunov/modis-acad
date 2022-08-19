import { API_ENDPOINT} from "../config";
import { Identifiable, IdType } from "../sharedTypes";
import { UserT } from "./model/UserT";

const API_BASE_URL=`${API_ENDPOINT}`;

export interface ApiClient<K, V extends Identifiable<K>> {
    findAll(): Promise<V[]>;
    findById(id: K): Promise<V>;
    create(entityWithoutId: Partial<V>): Promise<V>;
    update(entityWithoutId: V): Promise<V>;
    deleteById(id: K): Promise<V>;
    
}
export interface UserApiClientI extends ApiClient<IdType,UserT> {
    findByName(term:string): Promise<UserT>;
    findByUsername(username:string): Promise<UserT>
}

export class ApiClientImpl<K, V extends Identifiable<K>> implements ApiClient<K, V> {
    constructor(public apiCollectionSuffix: string) {}

    findByName(term: string): Promise<V> {
        return this.handleRequest(term);
    }
    findAll(): Promise<V[]> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`);
    }
    findById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`);
    }
    create(entityWithoutId: Partial<V>): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entityWithoutId)
        });
    }
    update(entity: V): Promise<V> {

        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${entity.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
    }
    deleteById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`, {
            method: 'DELETE'
        });
    }

    protected async handleRequest(url: string, options?: RequestInit) {
        try {
            const resp = await fetch(url, options);
            if(resp.status >= 400) {
                return Promise.reject(resp.body);
            }
            return resp.json();
        } catch(err) {
            return Promise.reject(err);
        }
    }
}

class UserApiE extends ApiClientImpl<IdType, UserT> implements UserApiClientI {
    findByName(term:string) {
        let srchUrl = `${API_BASE_URL}/${this.apiCollectionSuffix}/?q=${term}&attr=username,firstName,lastName` ;
         return this.handleRequest(srchUrl);
    }
    findByUsername(username:string){
        console.log(`${API_BASE_URL}/${this.apiCollectionSuffix}/?username=${username}`)
        
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}?username=${username}`);
    }
}

        
export const UsersApi: UserApiClientI = new UserApiE('users');
