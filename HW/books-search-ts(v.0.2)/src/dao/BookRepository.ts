import { BookImpl } from "../model/Book.js";
import { IdType } from "../model/Shared.js";
import { RepositoryImpl, Repositry } from "./Repository.js";

export class BookRepositoryImpl extends RepositoryImpl<BookImpl>{
    constructor(public endpoint:string,public favEndpoint:string){
        super(endpoint);

    };
    getAll(): Promise<Map<IdType, BookImpl>> {
        throw new Error("Method not implemented.");
    }
    async getFavs(): Promise<BookImpl[]>{
        const favsPromise = await fetch(this.favEndpoint);
        const favs = await favsPromise.json();
        return favs;
    }
    async getByQuery(q: string): Promise<Map<IdType, BookImpl>> {
        const bookP = await fetch(q);
        const books = await bookP.json();
        return books.items;
    }
    getById(id: IdType): Promise<BookImpl> {
        throw new Error("Method not implemented.");
    }
    async create(book: BookImpl): Promise<BookImpl> {
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
    update(entity: BookImpl): Promise<BookImpl> {
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