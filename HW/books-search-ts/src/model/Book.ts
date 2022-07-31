import { Annotation, AnnotationImpl } from "./Annotation.js";
import { AnnotationManager, AnnotationManagerImpl } from "./AnnotationManager.js";
import { FAV_URL } from "./config.js";
import Identifiable, { IdType } from "./Shared.js";
interface GoogleBookData {
  imageLinks:imageLinks,
  title:string,
  description:string,
  authors:string[]
}
interface imageLinks {
  thumbnail:string;
}

export interface Book{
  id: string
  volumeInfo: GoogleBookData;
  title:string,
  authors:string[],
  description:string,
  fav:boolean,
  annotations: Annotation[],
  annotationManager: AnnotationManager,
  article:HTMLElement,
  getBookArticle():HTMLElement,
  toggleElement(e:Event): void,
  handleFav(): void

}

export class BookImpl implements Book{
 //public thumbnail: string;
 public title: string;
 public description: string;
 public authors: string[];
 public article: HTMLElement  = document.createElement("div");
  constructor(
    public id: string,
    public volumeInfo: GoogleBookData,
    public fav:boolean,
    public annotations: Annotation[] = [],
    public annotationManager:AnnotationManagerImpl
  ) {
    //this.thumbnail = volumeInfo.imageLinks.thumbnail || ;
    this.title = volumeInfo.title;
    this.description = volumeInfo.description;
    this.authors = volumeInfo.authors;
  }
  getBookArticle():HTMLElement {
    const img = new Image();
    img.src = (this.volumeInfo.imageLinks)? this.volumeInfo.imageLinks.thumbnail : "images/no-image.jpg";
    const titleH = document.createElement("h3");
    titleH.innerHTML = this.title;
    const descriptionH = document.createElement("p");
    descriptionH.innerHTML = "Description";
    const descrText = document.createElement("div");
    descrText.innerHTML = this.description;
    descrText.classList.add("hide");
    descriptionH.append(descrText);
    //add listener to toggle description
    descriptionH.addEventListener("click", (e) => {
      this.toggleElement(e);
    });
    const authorH = document.createElement("h4");
    authorH.innerHTML = this.authors ? this.authors.join(",") : "No Data";

    const favbtn = document.createElement("div");
    favbtn.innerHTML = this.fav ? "Remove from favs" : "Add to favs";
    favbtn.onclick = this.handleFav;

    const annotations = document.createElement("div");
    annotations.innerHTML = "Show/Hide annotations.";
    annotations.setAttribute("class", "book-annotation");
    annotations.addEventListener("click", (e) => {
      this.toggleElement(e);
    })
    //list annotations
    
    annotations.appendChild(this.annotationManager.renderAnnotations(this.annotations,this.id));

    //add annot form
    
    //append created elements to article
    this.article.replaceChildren(
      img,
      titleH,
      authorH,
      descriptionH,
      favbtn,
      annotations
    );
    this.article.setAttribute("class", "book-container");
    
    return this.article;
  }
  toggleElement(e:Event):void {
    if (e.target){
    const toToggle = (e.target as HTMLDivElement).firstElementChild;
    if (toToggle) {
      toToggle.classList.toggle("hide");
    }}
  }
  handleFav = async () => {
    try {
      if (this.fav) {
        fetch(`${FAV_URL}/${this.id}`, {
          method: "DELETE",
        });
        this.fav = false;
        this.article.children[4].innerHTML = "Add to favs.";
        if(window.location.pathname==="/favourites") {
          this.article.remove();
        } ;

      } else {
        this.fav = true;
        this.article.children[4].innerHTML = "Remove from favs.";
        fetch(FAV_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            volumeInfo: {
              imageLinks: {
                thumbnail: this.volumeInfo.imageLinks.thumbnail,
              },
              title: this.title,
              description: this.description,
              authors: this.authors,
            },
            id: this.id,
            fav: this.fav,
          }),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}
