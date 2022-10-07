import { IdType } from "./sharedTypes";
import { IUser } from "./user";

export interface IComment {
    id:IdType,
    body:string,
    authorId:string,
    created:number,
    modified:number,
}