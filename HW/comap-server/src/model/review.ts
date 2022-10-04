import { ChildEntity, entities, IdType } from "./sharedTypes";
import { IUser } from "./user";

export interface IReview extends ChildEntity<IdType>{
    body:string,
    postedOn:string,
    author:IUser,
    rating:number;
    reviewedId:string;
}