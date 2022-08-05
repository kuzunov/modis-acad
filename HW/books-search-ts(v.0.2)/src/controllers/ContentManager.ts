import { BookRepository} from "../model/dao/BookRepository.js";
import { AnnotationManager} from "./AnnotationManager.js";
import { Book, BookImpl } from "../model/Book.js";
import { ANNO_URL, FAV_URL } from "../config.js";
import { BookTemplate} from "../views/templates/BookTemplate.js";

export interface ContentManager {
  
}

export class ContentManagerImpl{
  public lastSearched = new Map<string, Book>();
  public error:any;
  constructor(public books: Map<string,Book>, public wrapper: HTMLElement) {
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
          const books = await BookRepository.getByQuery(query);
          const favs = await BookRepository.getFavs();
        if (books) {
        books.forEach((book) => {
        fetchAnnotationURL += `&bookId=${book.id}`;
        });
          const annotations = await AnnotationManager.getAnnotations(
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
        BookTemplate.createDOMElements(book);
        BookTemplate.render(book.article);
        book.article.querySelector('.fav-btn')?.addEventListener("click", () => this.handleFav(book));
        book.article.querySelector('.book-annotations')?.appendChild(AnnotationManager.renderAnnotations(book.annotations,book.id))
        newBooks.push(book.article);
      })
      this.wrapper.replaceChildren(...newBooks);
      // const newBooks = this.books.forEach((book) => {
      //   BookTemplate.createDOMElements(book);
      //   BookTemplate.render(book.article);

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
        const annotations = await AnnotationManager.getAnnotations(
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
  handleFav = (book:Book) => {
    let favIcon = <HTMLImageElement>book.article.querySelector('.fav-btn')!;
    try {
      if (book.fav) {
        BookRepository.deleteById(book.id)
        book.fav = false;
        favIcon.src = "/images/not-favd.png"
        if(window.location.pathname==="/favourites") {
          book.article.remove();
        } ;

      } else {

        book.fav = true;
        favIcon.src = "/images/favd.png";
        const created = BookRepository.create(book);
      }
    } catch (e) {
      console.log(e);
    }
  };
}
