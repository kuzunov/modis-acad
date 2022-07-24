import { Annotation } from "./Annotation.js";
export class Book {
  constructor(
    {
      imageLinks = "No Data",
      title = "No Data",
      description = "No Data",
      authors,
    },
    id,
    annotations = [new Annotation()],annotationManager
  ) {
    this.thumbnail = imageLinks.thumbnail || "images/no-image.jpg";
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.id = id;
    this.annotations = annotations;
    this.annotationManager = annotationManager;
  }
  getBookArticle() {
    const article = document.createElement("article");
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

    const annotations = document.createElement("div");
    annotations.innerHTML = "Show/Hide annotations.";
    annotations.setAttribute("class", "book-annotation");
    const annotationsContent = document.createElement("div");
    //list annotations

    this.annotationManager.displayAnnotations(this.annotations, annotationsContent);

    //add annot form
    const antTitle = document.createElement("input");
    antTitle.type = "text";
    const antBody = document.createElement("input");
    antBody.type = "text";
    const sbmtAnnot = document.createElement("button");
    sbmtAnnot.innerHTML = "Submit Annotation";
    sbmtAnnot.addEventListener("click", () => {
      const newAnnot = new Annotation(undefined,this.id,antTitle.value,antBody.value,Date.now(),Date.now(),this.annotationManager)
      newAnnot.id = this.annotationManager.addAnnotation(newAnnot);
      newAnnot.render(annotationsContent);
    }


    );

    const annDiv = document.createElement("div");
    annDiv.append(annotationsContent,antTitle,antBody,sbmtAnnot);
    annDiv.style.display = "none";
    annotations.appendChild(annDiv);
    annotations.addEventListener("click", (e) => {
      this.toggleElement(e);
    });

    //append created elements to article
    article.append(img, titleH, authorH, descriptionH, annotations);
    article.setAttribute("class", "book-container");
    return article;
  }
  handleAnnotField() {
    return field;
  }
  toggleElement(e) {
    const toToggle = e.target.firstElementChild;
    if (toToggle){
    toToggle.style.display
      ? toToggle.style.removeProperty("display")
      : toToggle.style.setProperty("display", "none");
    }
  }
}
