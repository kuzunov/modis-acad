import { Annotation, AnnotationImpl } from "../model/Annotation.js";
import { AnnotationRepository } from "../model/dao/AnnotationRepository.js";
import { IdType } from "../Shared.js";
import { AnnotationTemplate} from "../views/templates/AnnotationTemplate.js";


type A = Promise<Map<IdType,Annotation[]>>;

export interface AnnotationManager {
  annotations: Annotation[];
  getAnnotations(url:string):A;
  addAnnotation(annotation:Annotation):Promise<IdType>;
  deleteAnnotation(annotation:Annotation):any;
  editAnnotation(annotation:Annotation):void;
  displayAllAnnotations(annotations:Annotation[], wrapper:HTMLDivElement):void;
  getAnnotationForm(bookId:string,wrapper:HTMLDivElement): HTMLDivElement;
  renderAnnotations(bookAnnotations:Annotation[],bookId:IdType):HTMLElement;
  validateInput(annotation:Annotation, wrapper:HTMLElement):boolean;
}

class AnnotationManagerImpl implements AnnotationManager {
  public annotations:Annotation[]
  constructor(annotations:Annotation[] = []) {
    this.annotations = annotations;
  }

  getAnnotations = async (fetchURL:string):A => {
   const annotations  = await AnnotationRepository.getByQuery(fetchURL)
   return annotations;
  };

  displayAllAnnotations = (annotations:Annotation[], wrapper:HTMLDivElement) => {
    if (annotations.length>0) {
      annotations.forEach((ann) => {
      AnnotationTemplate.createDOMElements(ann);
      AnnotationTemplate.render(ann.annotWrapper);
      this.addEventListeners(ann);
      wrapper.appendChild(ann.annotWrapper);
    });
  } else {
    const div = document.createElement('div');
    div.innerHTML = "Not annotated yet!";
    wrapper.appendChild(div);
  }
  };
  addAnnotation = async (annotation:Annotation) => {
    const newAnnot = await AnnotationRepository.create(annotation);
    const newId = await newAnnot.id;
    return newId;
  };
  deleteAnnotation = async (annotation:Annotation) => {
    const r = await AnnotationRepository.deleteById(annotation.id);
    return r;
  };

  getAnnotationForm = (bookId:IdType, wrapper:HTMLDivElement) => {
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
        const newId = this.addAnnotation(newAnnot);
        newAnnot.id = await newId;
        AnnotationTemplate.createDOMElements(newAnnot);

        AnnotationTemplate.render(newAnnot.annotWrapper);
        this.addEventListeners(newAnnot)
        wrapper.insertBefore(newAnnot.annotWrapper,annotForm)
      } else {
        //wrapper.appendChild(newAnnot.annotWrapper);
      }
    });
    const annotForm = document.createElement("div");
    annotForm.className = "annotations-form";
    annotForm.append(antTitle, antBody, sbmtAnnot);
    return annotForm;
  };
  renderAnnotations = (bookAnn:Annotation[], bookId:IdType) => {
    const annotationsContent = document.createElement("div");
    annotationsContent.classList.add('annotations-wrapper')
    //list annotations
    this.displayAllAnnotations(bookAnn, annotationsContent);
    annotationsContent.appendChild(
      this.getAnnotationForm(bookId, annotationsContent)
    );
    annotationsContent.classList.add("hide")
    return annotationsContent;
  };
  editAnnotation = (annotation:Annotation) => {
    AnnotationTemplate.editAnnotationFields(annotation);
    const btn = annotation.annotWrapper.querySelector(".edit-btn")!;
    const newBtn = new Image(16,16);
    newBtn.src = "/images/submit-edit.gif";
    newBtn.classList.add('edit-btn');
    newBtn.addEventListener("click", async () => {
      const newFields =<NodeListOf<HTMLInputElement>>annotation.annotWrapper.querySelectorAll(".annot-fields");
      annotation.body = newFields.item(0).value;
      annotation.title = newFields.item(1).value;
      annotation.modified = Date.now();
      if (this.validateInput(annotation, annotation.annotWrapper)) {

          const a = await AnnotationRepository.update(annotation);
          const editedFields =
          <NodeListOf<HTMLInputElement>>annotation.annotWrapper.querySelectorAll(".annot-fields");
          editedFields.forEach((f) => {
            const newElement = document.createElement("p");
            newElement.dataset.type = f.name;
            newElement.innerHTML = f.value;
            newElement.className = "annot-fields";
            annotation.annotWrapper.replaceChild(newElement, f);
           // ###newFields[newElement.dataset.type] = newElement;
          });
          annotation.annotWrapper.querySelector(".delete-btn")?.classList.toggle("hide");
          this.addEventListeners(annotation);
          annotation.annotWrapper.replaceChild(btn,newBtn)
    
      }
    })
    annotation.annotWrapper.querySelector(".delete-btn")?.classList.toggle("hide");
    annotation.annotWrapper.replaceChild(newBtn, btn);
  };
  validateInput(annotation:Annotation, wrapper:HTMLElement) {
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

  addEventListeners(ann:Annotation){
    const editbtn = ann.annotWrapper.querySelector(".edit-btn")!;
    const delbtn = ann.annotWrapper.querySelector(".delete-btn");
    if(delbtn){delbtn.addEventListener("click", () => {
      this.deleteAnnotation(ann);
      ann.annotWrapper.remove();
    })}
      
        editbtn.addEventListener("click", () => this.editAnnotation(ann))
  }
}
export const AnnotationManager = new AnnotationManagerImpl();
