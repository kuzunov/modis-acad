import { AnnotationManager } from "./AnnotationManager.js";
import { Book } from "./Book.js";
import {ANNO_URL} from "./config.js"

export class ContentManager {
	constructor(books, wrapper) {
		this.books = books;
		this.wrapper = wrapper;
		this.annotationManager = new AnnotationManager();
	}
	//clearWrapper...duh
	clearWrapper() {
		this.wrapper.textContent = "";
	}

	//query API for Books
	getBooks = async (query) => {
    // console.log(query)
	let fetchAnnotationURL = `${ANNO_URL}/?`;
	Object.values(this.books).forEach((book) => {
		fetchAnnotationURL += `&bookId=${book.id}`
	}); 
		try {
			const p = await fetch(query);
			const books = await p.json();
			const annotations = await this.annotationManager.getAnnotations(fetchAnnotationURL);

			books.items.map(book => {
				this.books[`${book.id}`]=new Book(book.volumeInfo,book.id,annotations[book.id],this.annotationManager)}
				);
		} catch (err) {
			this.error = err;
		}
		this.displayBooks();
	};
	//display books in this.books
	displayBooks = () => {
		this.clearWrapper();
		//check for errors or undef
		if (!this.error && this.books) {
			//createDOMElements
			const bookIds = this.books.map((book) => book.id);
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
}
