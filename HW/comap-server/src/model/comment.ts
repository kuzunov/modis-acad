import { ChildEntity, entities, IdType } from "./sharedTypes";
import { IUser } from "./user";


export interface IComment extends ChildEntity<IdType> {
    body:string,
    postedOn:string,
    authorId:IUser,
}