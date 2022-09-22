import { IUser } from "./user";

export interface IEvent {
    id:number;
    name:string,
    date:string,
    organizer:IUser,
    poster:string,
    description:string,
    location:google.maps.LatLngLiteral,
    participants: IUser[]
}