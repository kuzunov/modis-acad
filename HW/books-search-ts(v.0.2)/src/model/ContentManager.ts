import { BookRepository, BookRepositoryImpl } from "../dao/BookRepository.js";
import { AnnotationManager, AnnotationManagerImpl } from "./AnnotationManager.js";
import { Book, BookImpl } from "./Book.js";
import { ANNO_URL, API_URL, FAV_URL } from "./config.js";
import { BookTemplate, BookTemplateImpl } from "./templates/BookTemplate.js";

export interface ContentManager {
  books: Map<string,Book>;
  wrapper:HTMLElement;
  annotationManager: AnnotationManager;
  lastSearched: Map<string,Book>;
  getBooks(q?:string):void,
  displayBooks():void,
  getFavs():void,
  error:any;
  template:BookTemplate;
  repository:BookRepository;

}

export class ContentManagerImpl implements ContentManager {
  public annotationManager: AnnotationManager;
  public repository:BookRepository = new BookRepositoryImpl(API_URL,FAV_URL);
  public template:BookTemplate;
  public lastSearched: Map<string, Book>;
  public error:any;
  constructor(public books: Map<string,Book>, public wrapper: HTMLElement) {
    this.annotationManager = new AnnotationManagerImpl();
    this.lastSearched = new Map<string, BookImpl>();
    this.template = new BookTemplateImpl(this.repository,this.annotationManager)
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
        let fetchAnnotationURL='';
        try {
          const books = await this.repository.getByQuery(query);
          const favs = await this.repository.getFavs();
        if (books) {
        books.forEach((book) => {
        fetchAnnotationURL += `&bookId=${book.id}`;
        });
          const annotations = await this.annotationManager.getAnnotations(
              fetchAnnotationURL
            );
            this.books = new Map<string, Book>();
            books.forEach((book) => {
              (typeof book.id==="string")?
              this.books.set(book.id, new BookImpl(
                book.id,
                book.volumeInfo,
                favs.find((b:Book) => b.id === book.id) ? true : false,
                annotations.get(book.id),
              )
            ):book.id = "InvalidID"})
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
      
      // const newBooks = Array.from(this.books).map((book) => {
      //   return book[1].getBookArticle();
      // });
      // console.log(newBooks)
      // this.wrapper.replaceChildren(...newBooks);
      let newBooks:HTMLDivElement[] = [];
      this.books.forEach((book) => {
        this.template.createDOMElements(book);
        this.template.render(book.article);
        newBooks.push(book.article);
      })
      this.wrapper.replaceChildren(...newBooks);
      // const newBooks = this.books.forEach((book) => {
      //   this.template.createDOMElements(book);
      //   this.template.render(book.article);

      // })
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
      this.books = new Map<string, Book>();
      
        books.forEach((book:Book) => {
        fetchAnnotationURL += `&bookId=${book.id}`;
        });
        const annotations = await this.annotationManager.getAnnotations(
              fetchAnnotationURL
      );
      books.map((book:Book) => {
        if(typeof book.id!=="string") {book.id="invalid"}
        this.books.set(book.id, new BookImpl(
          book.id,
          book.volumeInfo,
          true,
          annotations.get(book.id)
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
