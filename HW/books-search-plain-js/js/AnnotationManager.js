import { ANNO_URL } from "./config.js";
import { Annotation } from "./Annotation.js";

export class AnnotationManager {
  constructor(annotations) {
    this.annotations = annotations;
  }

  getAnnotations = async (fetchURL) => {
    try {
      let returnArr = [];
      const response = await fetch(fetchURL);
      const annotations = await response.json();
      returnArr = annotations.reduce((returnArr, ann) => {
        const key = ann["bookId"];
        if (!returnArr[key]) {
          returnArr[key] = [];
        }
        returnArr[key].push(
          new Annotation(
            ann.id,
            ann.bookId,
            ann.title,
            ann.body,
            ann.created,
            ann.modified
          )
        );
        return returnArr;
      }, []);
      return returnArr;
    } catch (error) {
      console.log(error);
    }
  };
  displayAnnotations = (annotations, wrapper) => {
    annotations.forEach((ann) => {
      ann.render(wrapper);
      this.addButtonFunctions("delete", ann);
      this.addButtonFunctions("edit", ann);
    });
  };
  addAnnotation = async (annotation) => {
    try {
      const p = await fetch(`${ANNO_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(annotation),
      });
      const response = await p.json();
      return response.id;
    } catch (err) {
      console.log(err);
    }
  };
  deleteAnnotation = async (annotation) => {
    const p = await fetch(`${ANNO_URL}/${annotation.id}`, {
      method: "DELETE",
    });
    return await p.json();
  };

  getAnnotationForm = (bookId, wrapper) => {
    const antTitle = document.createElement("input");
    antTitle.className = "annot-fields";
    antTitle.type = "text";
    antTitle.dataset.type = "title";
    const antBody = document.createElement("input");
    antBody.className = "annot-fields";
    antBody.type = "text";
    antBody.dataset.type = "body";
    const sbmtAnnot = document.createElement("button");
    sbmtAnnot.innerHTML = "Submit Annotation";
    sbmtAnnot.addEventListener("click", async () => {
      const newAnnot = new Annotation(
        undefined,
        bookId,
        antTitle.value,
        antBody.value,
        Date.now(),
        Date.now()
      );
      if (this.validateInput(newAnnot, wrapper)) {
        newAnnot.id = await this.addAnnotation(newAnnot);
        newAnnot.render(wrapper);
        this.addButtonFunctions("delete", newAnnot);
        this.addButtonFunctions("edit", newAnnot);
      } else {
        wrapper.appendChild(newAnnot.annotWrapper);
      }
    });
    const annotForm = document.createElement("div");
    annotForm.className = "annotations-form";
    annotForm.append(antTitle, antBody, sbmtAnnot);
    return annotForm;
  };
  renderAnnotations = (bookAnn, bookId) => {
    const annotationsContent = document.createElement("div");
    //list annotations
    this.displayAnnotations(bookAnn, annotationsContent);
    annotationsContent.appendChild(
      this.getAnnotationForm(bookId, annotationsContent)
    );
    annotationsContent.style.display = "none";
    return annotationsContent;
  };
  editAnnotation = (annotation) => {
    const btn = annotation.annotWrapper.querySelector(".edit-btn");
    3;
    const fields = annotation.annotWrapper.querySelectorAll(".annot-fields");
    const newFields = [];
    fields.forEach((f) => {
      const newElement = document.createElement("input");
      newElement.name = f.dataset.type;
      newElement.value = f.innerHTML;
      newElement.className = "annot-field";
      newFields[newElement.name] = newElement;
      annotation.annotWrapper.replaceChild(newElement, f);
    });
    const newBtn = document.createElement("button");
    newBtn.innerHTML = "Edit";
    newBtn.addEventListener("click", async () => {
      annotation.body = newFields["body"].value;
      annotation.title = newFields["title"].value;
      annotation.modified = Date.now();
      if (this.validateInput(annotation, annotation.annotWrapper)) {
        try {
          const p = await fetch(`${ANNO_URL}/${annotation.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(annotation),
          });
          const response = await p.json();
          const oldButton = document.createElement("button");
          oldButton.innerHTML = "Edit";
          oldButton.className = "edit-btn";
          const editedFields =
            annotation.annotWrapper.querySelectorAll(".annot-field");
          editedFields.forEach((f) => {
            const newElement = document.createElement("p");
            newElement.dataset.type = f.name;
            newElement.innerHTML = f.value;
            newElement.className = "annot-field";
            annotation.annotWrapper.replaceChild(newElement, f);
            newFields[newElement.dataset.type] = newElement;
          });
          this.addButtonFunctions("edit", annotation);
          btn.parentNode.replaceChild(oldButton, newBtn);
        } catch (err) {
          console.log(err);
        }
      }
    });

    btn.parentNode.replaceChild(newBtn, btn);
  };
  addButtonFunctions = (type, annotation) => {
    const btn = annotation.annotWrapper.querySelector(`.${type}-btn`);
    if (btn) {
      btn.addEventListener("click", () => {
        this[`${type}Annotation`](annotation);
        if (type === "delete") {
          annotation.annotWrapper.remove();
        } else {
          // annotation.annotWrapper.innerHTML="";
          // annotation.render(annotation.annotWrapper)
        }
      });
    }
  };
  validateInput(annotation, wrapper) {
    const err = wrapper.querySelector(".error");
    if (annotation.title.length > 40 || annotation.body.length > 256) {
      if (!err) {
        const error = document.createElement("p");
        error.innerHTML =
          "Title should be less than 40 characters and body should be less than 256 characters.";
        error.style.color = "red";
        error.className = "error";
        wrapper.appendChild(error);
      }
      return false;
    } else {
      if (err) err.remove();
      return true;
    }
  }
}
