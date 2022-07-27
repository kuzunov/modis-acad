import { Annotation } from "./Annotation.js";
import { FAV_URL } from "./config.js";
export class Book {
  constructor(
    {
      imageLinks = "No Data",
      title = "No Data",
      description = "No Data",
      authors,
    },
    id,
    fav,
    annotations = [new Annotation()],
    annotationManager
  ) {
    this.thumbnail = imageLinks.thumbnail || "images/no-image.jpg";
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.id = id;
    this.fav = fav;
    this.annotations = annotations;
    this.annotationManager = annotationManager;
    this.article;
  }
  getBookArticle() {
    this.article = document.createElement("div");
    const img = new Image();
    img.src = this.thumbnail;
    const titleH = document.createElement("h3");
    titleH.innerHTML = this.title;
    const descriptionH = document.createElement("p");
    descriptionH.innerHTML = "Description";
    const descrText = document.createElement("div");
    descrText.innerHTML = this.description;
    descrText.style.display = "none";
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
    this.article.append(
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
  toggleElement(e) {
    const toToggle = e.target.firstElementChild;
    if (toToggle) {
      toToggle.style.display
        ? toToggle.style.removeProperty("display")
        : toToggle.style.setProperty("display", "none");
    }
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
                thumbnail: this.thumbnail,
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
