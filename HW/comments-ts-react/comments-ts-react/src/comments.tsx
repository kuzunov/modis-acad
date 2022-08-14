import { Status } from "./model/CommentT";

export const props = {
    id:1,
    title:"works",
    body:"some body",
    status: Status.ACTIVE,
    created: Date().toLocaleUpperCase(),
    modified: Date().toLocaleUpperCase()}