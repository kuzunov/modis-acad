import {API_URL, FAV_URL } from "../../config.js";
import { Book } from "../Book.js";
import { IdType } from "../../Shared.js";
import { RepositoryImpl, Repositry } from "./Repository.js";

export interface BookRepository extends Repositry<Book> {
  getById(id:IdType):Promise<Book>,
  getByQuery(q:string):Promise<Map<IdType,Book>>,
  create(book: Book): Promise<Book>;
  update(Book: Book): Promise<Book>;
  deleteById(id: IdType): Promise<object>;
  getFavs(): Promise<Book[]>
  count(): number;
  endpoint:string;
}

class BookRepositoryImpl extends RepositoryImpl<Book> implements BookRepository{
    constructor(public endpoint:string,public favEndpoint:string){
        super(endpoint);

    };
    async getFavs(): Promise<Book[]>{
        const favsPromise = await fetch(this.favEndpoint);
        const favs = await favsPromise.json();
        return favs;
    }
    async getByQuery(q: string): Promise<Map<IdType, Book>> {
        const bookP = await fetch(q);
        const books = await bookP.json();
        return books.items;
    }
    getById(id: IdType): Promise<Book> {
        throw new Error("Method not implemented.");
    }
    async create(book: Book): Promise<Book> {
        const p = await fetch(this.favEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              volumeInfo: {
                imageLinks: {
                  thumbnail: book.volumeInfo.imageLinks.thumbnail,
                },
                title: book.title,
                description: book.description,
                authors: book.authors,
              },
              id: book.id,
              fav: book.fav,
            }),
          });
          const result = await p.json()
          return result;

    }
    update(entity: Book): Promise<Book> {
        throw new Error("Method not implemented.");
    }
    async deleteById(id: IdType): Promise<any> {
        const p = await fetch(`${this.favEndpoint}/${id}`, {
            method: "DELETE",
          });
          const result = await p.json();
          return result;
        
    }
    count(): number {
        throw new Error("Method not implemented.");
    }
}
export const BookRepository = new BookRepositoryImpl(API_URL, FAV_URL);