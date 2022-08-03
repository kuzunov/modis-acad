import { ANNO_URL } from "./config.js";
import { Annotation, AnnotationImpl } from "./Annotation.js";
import { AnnotationRepository, AnnotationRepositoryImpl } from "../dao/AnnotationRepository.js";
import { IdType } from "../model/Shared.js";
import { AnnotationTemplate, AnnotationTemplateImpl } from "./templates/AnnotationTemplate.js";


type A = Promise<Map<IdType,Annotation[]>>;

export interface AnnotationManager {
  annotations: Annotation[];
  repository: AnnotationRepository;
  template:AnnotationTemplate;
  getAnnotations(url:string):A;
  addAnnotation(annotation:Annotation):Promise<IdType>;
  deleteAnnotation(annotation:Annotation):any;
  editAnnotation(annotation:Annotation):void;
  displayAllAnnotations(annotations:Annotation[], wrapper:HTMLDivElement):void;
  getAnnotationForm(bookId:string,wrapper:HTMLDivElement): HTMLDivElement;
  renderAnnotations(bookAnnotations:Annotation[],bookId:string):HTMLElement;
  validateInput(annotation:Annotation, wrapper:HTMLElement):boolean;
}

export class AnnotationManagerImpl implements AnnotationManager {
  public annotations:Annotation[]
  public repository:AnnotationRepository = new AnnotationRepositoryImpl(ANNO_URL)
  public template: AnnotationTemplate = new AnnotationTemplateImpl(this.repository);
  constructor(annotations:Annotation[] = []) {
    this.annotations = annotations;
  }

  getAnnotations = async (fetchURL:string):A => {
   const annotations  = await this.repository.getByQuery(fetchURL)
   return annotations;
  };

  displayAllAnnotations = (annotations:Annotation[], wrapper:HTMLDivElement) => {
    if (annotations.length>0) {
      annotations.forEach((ann) => {
      this.template.createDOMElements(ann);
      this.template.render(ann.annotWrapper);
      const btn = ann.annotWrapper.querySelector(".edit-btn");
      if(btn){
        btn.addEventListener("click", () => this.editAnnotation(ann))
      }
      wrapper.appendChild(ann.annotWrapper);
    });
  } else {
    const div = document.createElement('div');
    div.innerHTML = "Not annotated yet!";
    wrapper.appendChild(div);
  }
  };
  addAnnotation = async (annotation:Annotation) => {
    const newAnnot = await this.repository.create(annotation);
    const newId = await newAnnot.id;
    return newId;
  };
  deleteAnnotation = async (annotation:Annotation) => {
    const r = await this.repository.deleteById(annotation.id);
    return r;
  };

  getAnnotationForm = (bookId:string, wrapper:HTMLDivElement) => {
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
        this.template.createDOMElements(newAnnot);
        this.template.render(newAnnot.annotWrapper);
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
  renderAnnotations = (bookAnn:Annotation[], bookId:string) => {
    const annotationsContent = document.createElement("div");
    //list annotations
    this.displayAllAnnotations(bookAnn, annotationsContent);
    annotationsContent.appendChild(
      this.getAnnotationForm(bookId, annotationsContent)
    );
    annotationsContent.classList.add("hide")
    return annotationsContent;
  };
  editAnnotation = (annotation:Annotation) => {
    this.template.editAnnotationFields(annotation);
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

          const a = await this.repository.update(annotation);
          const oldButton = document.createElement("button");
          oldButton.innerHTML = "Edit";
          oldButton.className = "edit-btn";
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
          btn.addEventListener("click", () => {
            this.editAnnotation(annotation)
          })
          annotation.annotWrapper.replaceChild(btn,newBtn)
    
      }
    })
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
}
