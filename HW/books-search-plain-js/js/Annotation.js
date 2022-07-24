export class Annotation {
    constructor (id, bookId,title,body,created,modified,manager) {
            this.id = id;
            this.bookId = bookId;
            this.body = body;
            this.title = title;
            this.created = created;
            this.modified = modified;
            this.manager = manager;
    }
    render = (wrapper) => {
        if (this.id) {
            const annotWrapper = document.createElement("div");
            const annotTitle = document.createElement("h6");
            annotTitle.innerHTML = `${this.title}`;
            const annotBody = document.createElement("p");
            annotBody.innerHTML = `${this.body}`;
            const dates = document.createElement("div");
            dates.innerHTML = `C: ${this.created} // M: ${this.modified}`
            const del = document.createElement("button");
            del.innerHTML = "X";
            del.addEventListener("click", () => {
                this.manager.deleteAnnotation(this.id);
                annotWrapper.remove();
            });
            annotWrapper.appendChild(annotTitle);
            annotWrapper.appendChild(annotBody);
            annotWrapper.appendChild(dates);
            annotWrapper.appendChild(del);
            wrapper.appendChild(annotWrapper);
        }
        else {
            const notAnnotated = document.createElement("div");
            notAnnotated.innerHTML = "This book is not annotated yet."
            wrapper.appendChild(notAnnotated);

        }
    }
}