import { UserT } from "./Components/model/UserT";

export enum USER_STATUS {
    ACTIVE = 1,
    SUSPENDED,
    DEACTIVATED
}
export enum USER_ROLE {
    USER=1,
    ADMIN=2
}
export type USER_GENDER = "m"|"f"
export type STATUS_FILTER = USER_STATUS|undefined;

export interface Identifiable<IdType> {
    id: IdType;
}

export type IdType =  number | undefined;

export type UserListener = (user:UserT) => void;
export const Guest:Partial<UserT> ={
    username: 'Guest',
    role: 1,
  } 

