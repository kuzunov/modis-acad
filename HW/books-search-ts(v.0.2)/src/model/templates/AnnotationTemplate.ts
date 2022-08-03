import { AnnotationRepository } from "../../dao/AnnotationRepository.js";
import { Annotation, AnnotationImpl } from "../Annotation.js";
import { Template, TemplateImpl } from "./Template.js";

export interface AnnotationTemplate extends Template<Annotation>{
    repo:AnnotationRepository;
    createDOMElements(annotation:Annotation):void
    editAnnotationFields(annotation:Annotation):Annotation;
}
export class AnnotationTemplateImpl extends TemplateImpl<Annotation> implements AnnotationTemplate{
    repo:AnnotationRepository;
    constructor(repo:AnnotationRepository){
        super();
        this.repo = repo;
    }
    createDOMElements(annotation: Annotation) {
      const annotTitle = document.createElement("p");
      annotTitle.className = "annot-fields";
      annotTitle.dataset.type = "title";
      annotTitle.innerHTML = `${annotation.title}`;
      const annotBody = document.createElement("p");
      annotBody.className = "annot-fields";
      annotBody.dataset.type = "body";
      annotBody.innerHTML = `${annotation.body}`;
      const dates = document.createElement("div");
      dates.innerHTML = `C: ${new Date(
        annotation.created
      ).toLocaleString()} // M: ${new Date(annotation.modified).toLocaleString()}`;
      const del = document.createElement("button");
      del.innerHTML = "X";
      del.className = "delete-btn";
      const edit = document.createElement("button");
      edit.innerHTML = "Edit";
      edit.className = "edit-btn";
      del.addEventListener("click", () => {
        this.repo.deleteById(annotation.id);
        annotation.annotWrapper.remove();
      })
      this.DOMElements = [annotTitle,annotBody,dates,del,edit]
    }
    editAnnotationFields(ann:Annotation) {
      const fields = <NodeListOf<HTMLElement>>ann.annotWrapper.querySelectorAll(".annot-fields");
      fields.forEach((f) => {
        const newElement = document.createElement("input");
        if(f.dataset.type !== undefined){
          newElement.name = f.dataset.type;
        }
        newElement.value = f.innerHTML;
        newElement.className = "annot-field";
        ann.annotWrapper.replaceChild(newElement, f);
      });
      return ann;
    }
}