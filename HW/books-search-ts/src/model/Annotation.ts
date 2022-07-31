import Identifiable, { IdType } from "./Shared";

export interface Annotation {
  id:number|undefined;
  bookId: string;
  body: string;
  title: string;
  created: number;
  modified: number;
  annotWrapper: HTMLElement;
  render(wrapper:HTMLElement):void;
}
export class AnnotationImpl implements Annotation {
  public annotWrapper: HTMLElement;
  constructor(
    public id: number|undefined,
    public bookId: string,
    public title: string,
    public body: string,
    public created: number,
    public modified: number
  ) {
    this.id = id;
    this.annotWrapper = document.createElement("div");
  }
  render = (wrapper:HTMLElement) => {
    if (this.id) {
      const annotTitle = document.createElement("p");
      annotTitle.className = "annot-fields";
      annotTitle.dataset.type = "title";
      annotTitle.innerHTML = `${this.title}`;
      const annotBody = document.createElement("p");
      annotBody.className = "annot-fields";
      annotBody.dataset.type = "body";
      annotBody.innerHTML = `${this.body}`;
      const dates = document.createElement("div");
      dates.innerHTML = `C: ${new Date(
        this.created
      ).toLocaleString()} // M: ${new Date(this.modified).toLocaleString()}`;
      const del = document.createElement("button");
      del.innerHTML = "X";
      del.className = "delete-btn";
      const edit = document.createElement("button");
      edit.innerHTML = "Edit";
      edit.className = "edit-btn";
      this.annotWrapper.replaceChildren(annotTitle, annotBody, dates, edit, del);
      wrapper.appendChild(this.annotWrapper);
    } else {
      const notAnnotated = document.createElement("div");
      notAnnotated.innerHTML = "This book is not annotated yet.";
      wrapper.appendChild(notAnnotated);
    }
  };
}
