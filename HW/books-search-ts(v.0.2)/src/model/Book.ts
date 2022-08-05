import { Annotation} from "./Annotation.js";
import Identifiable, { IdType } from "../Shared.js";
interface GoogleBookData {
  imageLinks:imageLinks,
  title:string,
  description:string,
  authors:string[]
}
interface imageLinks {
  thumbnail:string;
}

export interface Book extends Identifiable{
  volumeInfo: GoogleBookData;
  title:string,
  authors:string[],
  description:string,
  fav:boolean,
  annotations: Annotation[],
  article:HTMLDivElement

}

export class BookImpl implements Book{
 //public thumbnail: string;
 public title: string;
 public description: string;
 public authors: string[];
 public article: HTMLDivElement;
  constructor(
    public id: IdType,
    public volumeInfo: GoogleBookData,
    public fav:boolean,
    public annotations: Annotation[] = []
  ) {
    this.title = volumeInfo.title;
    this.description = volumeInfo.description;
    this.authors = volumeInfo.authors;
    this.article = document.createElement("div");
    this.article.classList.add("book-container")
  }
  
}
