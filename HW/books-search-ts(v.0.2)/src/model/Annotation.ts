import Identifiable, { IdType } from "./Shared.js";

export interface Annotation extends Identifiable{
  bookId: string;
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
    public bookId: string,
    public title: string,
    public body: string,
    public created: number,
    public modified: number
  ) {
    this.id = id;
    this.annotWrapper = document.createElement("div");
  }
}
