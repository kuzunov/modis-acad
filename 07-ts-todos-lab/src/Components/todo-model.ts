import { IdType} from "./shared-types";

export enum TodoStatus{
    Active = 1,Completed,Cancelled
}

export default class Todo {

    constructor(
        public text: string,
        public deadline:string = new Date().toISOString().split("T")[0],
        public status = TodoStatus.Active,
        public id: IdType = undefined

    ){}
}