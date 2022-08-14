import Identifiable, { IdType } from "../Shared.js";

export interface Annotation extends Identifiable{
  bookId: IdType;
  body: string;
  title: string;
  created: number;
  modified: number;
  annotWrapper: HTMLDivElement;
}
export class AnnotationImpl implements Annotation  {
  public annotWrapper: HTMLDivElement;
  constructor(
    public id:IdType,
    public bookId: IdType,
    public title: string,
    public body: string,
    public created: number,
    public modified: number
  ) {
    this.id = id;
    this.annotWrapper = document.createElement("div");
  }
}
