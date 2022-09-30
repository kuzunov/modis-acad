
import { API_ENDPOINT } from "../evn.var.config";
import { IEvent } from "../model/event";
import { IOrganization } from "../model/organization";
import { Identifiable, IdType } from "../model/sharedTypes";
import { IUser } from "../model/user";


const API_BASE_URL = `${API_ENDPOINT}`;

export interface ApiClient<K, V extends Identifiable<K>> {
  findAll(): Promise<V[]>;
  findById(id: K): Promise<V>;
  create(entityWithoutId: Partial<V>): Promise<V>;
  update(entityWithoutId: V): Promise<V>;
  deleteById(id: K): Promise<V>;
}
export interface UserApiClientI extends ApiClient<IdType, IUser> {
  findByName(term: string): Promise<IUser[]>;
  login(username: string): Promise<IUser[]>;
  getPassword(username: string): Promise<string>;
  checkUsernameUniqueness(username: string): Promise<boolean>;
}

export class ApiClientImpl<K, V extends Identifiable<K>>
  implements ApiClient<K, V>
{
  constructor(public apiCollectionSuffix: string) {}

  findByName(term: string): Promise<V[]> {
    return this.handleRequest(term);
  }
  findAll(): Promise<V[]> {
    return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`);
  }
  findById(id: K): Promise<V> {
    return this.handleRequest(
      `${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`
    );
  }
  create(entityWithoutId: Partial<V>): Promise<V> {
    return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(entityWithoutId),
    });
  }
  update(entity: V): Promise<V> {
    return this.handleRequest(
      `${API_BASE_URL}/${this.apiCollectionSuffix}/${entity.id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(entity),
      }
    );
  }
  deleteById(id: K): Promise<V> {
    return this.handleRequest(
      `${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`,
      {
        method: "DELETE",
      }
    );
  }

  protected async handleRequest(url: string, options?: RequestInit) {
    try {
      const resp = await fetch(url, options);
      if (resp.status >= 400) {
        return Promise.reject(resp.body);
      }
      return resp.json();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
class EventsApiE extends ApiClientImpl<IdType, IEvent> {}
class OrganizationsApiE extends ApiClientImpl<IdType, IOrganization> {}
class UserApiE extends ApiClientImpl<IdType, IUser> implements UserApiClientI {
  findByName(term: string) {
    let srchUrl = `${API_BASE_URL}/${this.apiCollectionSuffix}/?q=${term}&attr=username,firstName,lastName`;
    return this.handleRequest(srchUrl);
  }
  checkUsernameUniqueness = async (username: string) => {
    let findName: [] = await this.handleRequest(
      `${API_BASE_URL}/${this.apiCollectionSuffix}/?username=${username}`
    );
    return findName.length > 0 ? false : true;
  };
  login = async (username: string) => {
    return this.handleRequest(
      `${API_BASE_URL}/${this.apiCollectionSuffix}?username=${username}`
    );
  };
  getPassword = async (username: string) => {
    const user = await this.handleRequest(
      `${API_BASE_URL}/${this.apiCollectionSuffix}?username=${username}`
    );
    return user[0].password;
  };
}
export const EventsApi = new EventsApiE("events");
export const OrganizationsApi = new OrganizationsApiE("organizations");
// export const UsersApi: UserApiClientI = new UserApiE("users");
export {};