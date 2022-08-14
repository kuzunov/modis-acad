export enum Status {
    SUSPENDED = 0,
    ACTIVE,
    ALL
};

export type CommentT = {
    id:number,
    title:string,
    body:string,
    status:Status,
    created:number,
    modified:number,
}

export type CommentsError = {
    status:boolean,
    message?:string,
}
 