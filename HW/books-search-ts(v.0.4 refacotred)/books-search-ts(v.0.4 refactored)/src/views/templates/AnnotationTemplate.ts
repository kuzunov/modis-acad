import { AnnotationRepository } from "../../model/dao/AnnotationRepository.js";
import { Annotation } from "../../model/Annotation.js";
import { Template, TemplateImpl } from "./Template.js";

export interface AnnotationTemplate extends Template<Annotation>{
    createDOMElements(annotation:Annotation):void
    editAnnotationFields(annotation:Annotation):Annotation;
}
class AnnotationTemplateImpl extends TemplateImpl<Annotation> implements AnnotationTemplate{
    constructor(){
        super();
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
      const del = new Image(16,16);
      del.src = "/images/trash.png";
      del.className = "delete-btn";
      const edit = new Image(16,16);
      edit.src = "/images/edit.png";
      edit.className = "edit-btn";
      this.DOMElements = [annotTitle,annotBody,dates,del,edit]
    }
    editAnnotationFields(ann:Annotation) {
      const fields = <NodeListOf<HTMLElement>>ann.annotWrapper.querySelectorAll(".annot-fields");
      console.log(fields);
      fields.forEach((f) => {
        const newElement = document.createElement("input");
        if(f.dataset.type !== undefined){
          newElement.name = f.dataset.type;
        }
        newElement.value = f.innerHTML;
        newElement.className = "annot-fields";
        ann.annotWrapper.replaceChild(newElement, f);
      });
      return ann;
    }
}
export const AnnotationTemplate = new AnnotationTemplateImpl()