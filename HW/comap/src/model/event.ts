import { IdType } from "./sharedTypes";
import { IUser } from "./user";

export interface IEvent {
    id:IdType,
    name:string,
    date:string,
    organizer:IUser,
    poster:string,
    description:string,
    locations:google.maps.MarkerOptions[],
    participants: IUser[]
}