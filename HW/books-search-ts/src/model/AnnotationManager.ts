import { ANNO_URL } from "./config.js";
import { AnnotationImpl } from "./Annotation.js";
type A = Promise<Map<string,AnnotationImpl[]>>;

export interface AnnotationManager {
  annotations: AnnotationImpl[];
  getAnnotations(url:string):A;
  addAnnotation(annotation:AnnotationImpl):Promise<number>;
  deleteAnnotation(annotation:AnnotationImpl):void;
  displayAnnotations(annotations:AnnotationImpl[], wrapper:HTMLElement):void;
  getAnnotationForm(bookId:string,wrapper:HTMLElement): HTMLElement;
  renderAnnotations(bookAnnotations:AnnotationImpl[],bookId:string):HTMLElement;
  editAnnotation(annotation:AnnotationImpl):void;
  addButtonFunctions(type:string,annotation:AnnotationImpl):void
  validateInput(annotation:AnnotationImpl, wrapper:HTMLElement):boolean;
}

export class AnnotationManagerImpl implements AnnotationManager {
  public annotations:AnnotationImpl[]
  constructor(annotations:AnnotationImpl[] = []) {
    this.annotations = annotations;
  }

  getAnnotations = async (fetchURL:string) => {
    let returnMap = new Map<string,AnnotationImpl[]>();
    try {
      const response = await fetch(fetchURL);
      const annotations:AnnotationImpl[] = await response.json();
      annotations.forEach(ann => {
        const key = ann.bookId;
        (returnMap.get(key))?
        returnMap.set(key,[
              new AnnotationImpl(
                ann.id,
                ann.bookId,
                ann.title,
                ann.body,
                ann.created,
                ann.modified
              ),...returnMap.get(key)!]):returnMap.set(key,[])
        }
      );
      // returnMap = annotations.reduce((returnMap:Map<string,AnnotationImpl[]>, ann:AnnotationImpl) => {
      //   const key = ann["bookId"];
      //   if (!returnMap.has(key)) {
      //     returnMap.set(key, []);
      //   }
      //   returnMap.set(key,[
      //     new AnnotationImpl(
      //       ann.id,
      //       ann.bookId,
      //       ann.title,
      //       ann.body,
      //       ann.created,
      //       ann.modified
      //     ),...returnMap.get(key)]
      //   );
      //   return returnMap;
      // }, []);
      console.log(returnMap)
    } catch (error) {
      console.log(error);
    }
    return returnMap;
  };
  displayAnnotations = (annotations:AnnotationImpl[], wrapper:HTMLElement) => {
    if (annotations.length>0) {
    annotations.forEach((ann) => {
      ann.render(wrapper);
      this.addButtonFunctions("delete", ann);
      this.addButtonFunctions("edit", ann);
    });
  } else {
    const div = document.createElement('div');
    div.innerHTML = "Not annotated yet!";
    wrapper.appendChild(div);
  }
  };
  addAnnotation = async (annotation:AnnotationImpl) => {
    let newId = -1;
    try {
      const response = await fetch(`${ANNO_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(annotation),
      });
      const {id} = await response.json();
      newId = id;
    } catch (err) {
      console.log(err);
    }
    return newId;
  };
  deleteAnnotation = async (annotation:AnnotationImpl) => {
    const p = await fetch(`${ANNO_URL}/${annotation.id}`, {
      method: "DELETE",
    });
    const r = await p.json();
    return r;
  };

  getAnnotationForm = (bookId:string, wrapper:HTMLElement) => {
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
      const newAnnot = new AnnotationImpl(
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
  renderAnnotations = (bookAnn:AnnotationImpl[], bookId:string) => {
    const annotationsContent = document.createElement("div");
    //list annotations
    this.displayAnnotations(bookAnn, annotationsContent);
    annotationsContent.appendChild(
      this.getAnnotationForm(bookId, annotationsContent)
    );
    annotationsContent.classList.add("hide")
    return annotationsContent;
  };
  editAnnotation = (annotation:AnnotationImpl) => {
    const btn = annotation.annotWrapper.querySelector(".edit-btn");
    const fields = <NodeListOf<HTMLElement>>annotation.annotWrapper.querySelectorAll(".annot-fields");
    const newFields: Record<string, HTMLInputElement>={};
    fields.forEach((f) => {
      const newElement = document.createElement("input");
      newElement.name = f.dataset.type!;
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
          <NodeListOf<HTMLInputElement>>annotation.annotWrapper.querySelectorAll(".annot-field");
          editedFields.forEach((f) => {
            const newElement = document.createElement("p");
            newElement.dataset.type = f.name;
            newElement.innerHTML = f.value;
            newElement.className = "annot-field";
            annotation.annotWrapper.replaceChild(newElement, f);
           // ###newFields[newElement.dataset.type] = newElement;
          });
          this.addButtonFunctions("edit", annotation);

          if (btn?.parentNode) btn.parentNode.replaceChild(oldButton, newBtn);
        } catch (err) {
          console.log(err);
        }
      }
    });
    if (btn?.parentNode)
    btn.parentNode!.replaceChild(newBtn, btn);
  };
  addButtonFunctions = (type:string, annotation:AnnotationImpl) => {
    const btn = annotation.annotWrapper.querySelector(`.${type}-btn`);
    if (btn) {
      btn.addEventListener("click", () => {
        const key = `${type}Annotation`;
        if (type === "delete") {
          this.deleteAnnotation(annotation);
          annotation.annotWrapper.remove();
        } else {
          this.editAnnotation(annotation);
          // annotation.annotWrapper.innerHTML="";
          // annotation.render(annotation.annotWrapper)
        }
      });
    }
  };
  validateInput(annotation:AnnotationImpl, wrapper:HTMLElement) {
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
