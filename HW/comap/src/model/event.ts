import { IUser } from "./user";

export interface IEvent {
    id:number;
    name:string,
    date:string,
    organizer:IUser,
    poster:string,
    participants: IUser[]
}