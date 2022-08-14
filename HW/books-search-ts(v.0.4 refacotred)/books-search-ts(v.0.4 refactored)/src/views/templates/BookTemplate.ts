import { Book } from "../../model/Book.js";
import { Template, TemplateImpl } from "./Template.js";
export interface BookTemplate extends Template<Book>{
    createDOMElements(books:Book):void
}
class BookTemplateImpl extends TemplateImpl<Book> implements BookTemplate{
    constructor(){
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
    favbtn.classList.add("fav-btn");
    

    const annotations = document.createElement("div");
    annotations.innerHTML = "Show/Hide annotations.";
    annotations.setAttribute("class", "book-annotations");
    annotations.addEventListener("click", (e) => {
      this.toggleElement(e);
    })
    //list annotations
    // if (typeof book.id === "string")
    // annotations.appendChild(this.annotationManager.renderAnnotations(book.annotations,book.id));

    
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

      toggleElement(e:Event):void {
        if (e.target){
        const toToggle = (e.target as HTMLDivElement).firstElementChild;
        if (toToggle) {
          toToggle.classList.toggle("hide");
        }}
      }

}
export const BookTemplate = new BookTemplateImpl();