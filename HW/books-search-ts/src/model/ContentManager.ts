import { AnnotationManager, AnnotationManagerImpl } from "./AnnotationManager.js";
import { Book, BookImpl } from "./Book.js";
import { ANNO_URL, FAV_URL } from "./config.js";

export interface ContentManager {
  books: Map<string,BookImpl>;
  wrapper:HTMLElement;
  annotationManager: AnnotationManagerImpl;
  lastSearched: Map<string,BookImpl>;
  getBooks(q:string):void,
  displayBooks():void,
  getFavs():void,
  error:any;

}

export class ContentManagerImpl implements ContentManager {
  public annotationManager: AnnotationManagerImpl;
  public lastSearched: Map<string, BookImpl>;
  public error:any;
  constructor(public books: Map<string,BookImpl>, public wrapper: HTMLElement) {
    this.annotationManager = new AnnotationManagerImpl();
    this.lastSearched = new Map<string, BookImpl>();
  }
  //clearWrapper...duh
  clearWrapper() {
    while (this.wrapper.firstChild) {
      this.wrapper.removeChild(this.wrapper.firstChild);
    }
  }

  //query API for Books
  getBooks = async (query?:string) => {
    if (this.lastSearched.size>0 && !query) {
      this.books = new Map(this.lastSearched);
      this.lastSearched.clear();
    } else {
      if (query) {
        let fetchAnnotationURL = `${ANNO_URL}/?`;
        try {
          const bookP = await fetch(query);
          const books = await bookP.json();
      if (books.items) {
		  books.items.forEach((book:BookImpl) => {
			fetchAnnotationURL += `&bookId=${book.id}`;
		  });
          const annotations = await this.annotationManager.getAnnotations(
            fetchAnnotationURL
          );
          const favsPromise = await fetch(FAV_URL);
          const favs = await favsPromise.json();
          this.books = new Map<string, BookImpl>();
          books.items.map((book:BookImpl) => {
            this.books.set(book.id, new BookImpl(
              book.id,
              book.volumeInfo,
              favs.find((b:Book) => b.id === book.id) ? true : false,
              annotations.get(book.id),
              this.annotationManager
            )
          )})
        }
          
        } catch (err:any) {
          this.error = err;
          console.log(err);
        }
      }
    }
    this.displayBooks();
  };
  //display books in this.books
  displayBooks = () => {
    this.clearWrapper();
    // (this.lastSearched)? this.books=this.lastSearched:this.books=[]
    //check for errors or undef
    if (!this.error && this.books) {
      //createDOMElements
      
      const newBooks = Array.from(this.books).map((book) => {
        return book[1].getBookArticle();
      });
      console.log(newBooks)
      this.wrapper.replaceChildren(...newBooks);
    } else {
      const error = document.createElement("p");
      error.innerHTML = this.error || "Nothing here";
      error.style.color = "red";
      this.wrapper.append(error);
    }
  };
  getFavs = async () => {
    this.lastSearched = new Map(this.books);
    this.books.clear();
    let fetchAnnotationURL = `${ANNO_URL}/?`;
    try {
      
      const bookP = await fetch(FAV_URL);
      const books = await bookP.json();
      this.books = new Map<string, BookImpl>();
      
        books.forEach((book:BookImpl) => {
        fetchAnnotationURL += `&bookId=${book.id}`;
        });
        const annotations = await this.annotationManager.getAnnotations(
              fetchAnnotationURL
      );
      books.map((book:BookImpl) => {
        this.books.set(book.id, new BookImpl(
          book.id,
          book.volumeInfo,
          true,
          annotations.get(book.id),
          this.annotationManager
        ))
      });
      // results.forEach()
      this.displayBooks();
    } catch (e:any) {
      this.error =e;
      console.log(e);
    }
  };
}
