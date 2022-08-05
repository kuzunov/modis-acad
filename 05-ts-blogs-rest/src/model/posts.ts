import { IdType } from "./shared-types.js";

export class PostCreateDto {
  constructor(
    public title: string,
    public content: string,
    public tags: string[],
    public imgUrl: string,
    public authorId: IdType
  ) {}
}
export class Post extends PostCreateDto {
  constructor(
    public id: IdType,
    title: string,
    content: string,
    tags: string[],
    imgUrl: string,
    authorId: IdType
  ) {
    super(title, content, tags, imgUrl, authorId);
  }
}
