import { IUser } from "./user";

export interface IEvent {
    id:string;
    name:string,
    date:string,
    organizer:IUser,
    poster:string,
    description:string,
    locations:google.maps.MarkerOptions[],
    participants: IUser[],
    created:number,
    modified:number,
}