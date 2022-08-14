export enum TodoStatus{
    Active = 1,Completed,Cancelled
}

export default class Todo {
    static nextId = 0;
    id = ++ Todo.nextId;

    constructor(
        public text: string,
        public status = TodoStatus.Active,
    ){}
}