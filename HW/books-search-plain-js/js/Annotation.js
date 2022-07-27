export class Annotation {
    constructor (id, bookId,title,body,created,modified) {
            this.id = id;
            this.bookId = bookId;
            this.body = body;
            this.title = title;
            this.created = created;
            this.modified = modified;
            this.annotWrapper = document.createElement("div");
    }
    render = (wrapper) => {
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
            dates.innerHTML = `C: ${new Date(this.created).toLocaleString()} // M: ${new Date(this.modified).toLocaleString()}`
            const del = document.createElement("button");
            del.innerHTML = "X";
            del.className = "delete-btn"
            const edit = document.createElement("button");
            edit.innerHTML = "Edit";
            edit.className = "edit-btn"
            this.annotWrapper.append(annotTitle, annotBody, dates, edit, del);
            wrapper.appendChild(this.annotWrapper);
        }
        else {
            const notAnnotated = document.createElement("div");
            notAnnotated.innerHTML = "This book is not annotated yet."
            wrapper.appendChild(notAnnotated);

        }
    }
}