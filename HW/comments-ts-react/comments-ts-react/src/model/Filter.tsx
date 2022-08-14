import { Status } from "./CommentT";

export type Order = "asc" | "desc"

export type Filter = {
    status: Status;
    //order: Order;
}