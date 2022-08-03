import { BookRepository, BookRepositoryImpl } from "../../dao/BookRepository.js";
import { AnnotationManager, AnnotationManagerImpl } from "../AnnotationManager.js";
import { Book } from "../Book.js";
import { Template, TemplateImpl } from "./Template.js";
export interface BookTemplate extends Template<Book>{
    repo:BookRepository;
    annotationManager: AnnotationManager;
    createDOMElements(books:Book):void

}
export class BookTemplateImpl extends TemplateImpl<Book> implements BookTemplate{
    constructor(public repo:BookRepository,public annotationManager:AnnotationManager){
        super();
    }
    createDOMElements(book: Book): void {
    const img = new Image();
    img.src = (book.volumeInfo.imageLinks)? book.volumeInfo.imageLinks.thumbnail : "images/no-image.jpg";
    const titleH = document.createElement("h3");
    titleH.innerHTML = book.title;
    const descriptionH = document.createElement("p");
    descriptionH.innerHTML = "Description";
    const descrText = document.createElement("div");
    descrText.innerHTML = book.description;
    descrText.classList.add("hide");
    descriptionH.append(descrText);
    //add listener to toggle description
    descriptionH.addEventListener("click", (e) => {
      this.toggleElement(e);
    });
    const authorH = document.createElement("h4");
    authorH.innerHTML = book.authors ? book.authors.join(",") : "No Data";

    const favbtn = new Image(32,32);
    favbtn.src = book.fav ? "/images/favd.png" : "/images/not-favd.png";
    favbtn.addEventListener("click", () => this.handleFav(book));

    const annotations = document.createElement("div");
    annotations.innerHTML = "Show/Hide annotations.";
    annotations.setAttribute("class", "book-annotation");
    annotations.addEventListener("click", (e) => {
      this.toggleElement(e);
    })
    //list annotations
    if (typeof book.id === "string")
    annotations.appendChild(this.annotationManager.renderAnnotations(book.annotations,book.id));

    
    //append created elements to article
    // book.article.replaceChildren(
    //   img,
    //   titleH,
    //   authorH,
    //   descriptionH,
    //   favbtn,
    //   annotations
    // );
    this.DOMElements = [img,
         titleH,
         authorH,
         descriptionH,
         favbtn,
         annotations]
    }
    handleFav = (book:Book) => {
        try {
          if (book.fav) {
            this.repo.deleteById(book.id)
            book.fav = false;
            book.article.children[4].innerHTML = "Add to favs.";
            if(window.location.pathname==="/favourites") {
              book.article.remove();
            } ;
    
          } else {

            book.fav = true;
            book.article.children[4].innerHTML = "Remove from favs.";
            const created = this.repo.create(book);
          }
        } catch (e) {
          console.log(e);
        }
      };
      toggleElement(e:Event):void {
        if (e.target){
        const toToggle = (e.target as HTMLDivElement).firstElementChild;
        if (toToggle) {
          toToggle.classList.toggle("hide");
        }}
      }

}