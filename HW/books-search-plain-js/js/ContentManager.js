import { AnnotationManager } from "./AnnotationManager.js";
import { Book } from "./Book.js";
import { ANNO_URL, FAV_URL } from "./config.js";

export class ContentManager {
  constructor(books, wrapper) {
    this.books = books;
    this.wrapper = wrapper;
    this.annotationManager = new AnnotationManager();
    this.lastSearched = {};
  }
  //clearWrapper...duh
  clearWrapper() {
    this.wrapper.innerHTML = "";
  }

  //query API for Books
  getBooks = async (query) => {
    if (Object.keys(this.lastSearched).length && !query) {
      this.books = this.lastSearched;
    } else {
      if (query) {
        let fetchAnnotationURL = `${ANNO_URL}/?`;
        try {
          const bookPromise = await fetch(query);
          const books = await bookPromise.json();
		  books.items.forEach((book) => {
			fetchAnnotationURL += `&bookId=${book.id}`;
		  });
          const annotations = await this.annotationManager.getAnnotations(
            fetchAnnotationURL
          );
          const favsPromise = await fetch(FAV_URL);
          const favs = await favsPromise.json();
          this.books = {};
          books.items.map((book) => {
            this.books[`${book.id}`] = new Book(
              book.volumeInfo,
              book.id,
              favs.find((b) => b.id === book.id) ? true : false,
              annotations[book.id],
              this.annotationManager
            );
          });
        } catch (err) {
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
      Object.values(this.books).forEach((book) => {
        this.wrapper.append(book.getBookArticle());
      });
    } else {
      const error = document.createElement("p");
      error.innerHTML = this.error || "Nothing here";
      error.style.color = "red";
      this.wrapper.append(error);
    }
  };
  getFavs = async () => {
    this.lastSearched = this.books;
    try {
      const p = await fetch(FAV_URL);
      const books = await p.json();
      this.books = {};
      books.map((book) => {
        this.books[`${book.id}`] = new Book(
          book.volumeInfo,
          book.id,
          true,
          [],
          this.annotationManager
        );
      });
      // results.forEach()
      this.displayBooks();
    } catch (e) {
      console.log(e);
    }
  };
}
