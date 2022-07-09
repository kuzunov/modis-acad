export class ContentManager {
    constructor(books,wrapper){
        this.books = books;
        this.wrapper = wrapper;
    }
    //clearWrapper...duh
    clearWrapper(){
        this.wrapper.textContent="";
    }

    //query API for Books
    getBooks = async (query) => { 
        try{
            const p = await fetch(query);
            const books = await p.json();
            this.books = books.items;
        } catch(err) {
            this.error = err;
        }
        this.displayBooks();
     }
     //display books in this.books
    displayBooks = () => {
        this.clearWrapper();
        //check for errors or undef
         if(!this.error&&this.books){
            //createDOMElements
            this.books.map(book => {
            const {imageLinks="No Image", title="No Data", description="No Data", authors="No Data"} = book.volumeInfo;
            const article = document.createElement("article");
            const img = new Image();
            img.src = imageLinks.thumbnail;
            const titleH = document.createElement("h3");
            titleH.innerHTML = title;
            const descriptionH = document.createElement("p");
            descriptionH.innerHTML = "Description";
            const descrText = document.createElement("div");
            descrText.innerHTML = description;
            descrText.style.display="none";
            descriptionH.append(descrText);
            descriptionH.addEventListener("click",()=>{
                (descrText.style.display)
                    ?descrText.style.removeProperty("display")
                    :descrText.style.setProperty("display","none")
            })
            const authorH = document.createElement("h4");
            authorH.innerHTML = authors.join(" ");
            article.append(img,titleH,authorH,descriptionH);
            article.setAttribute("class","book-container")
            //append to wrapper
            this.wrapper.append(article);
        })
        }else { 
            const error = document.createElement("p");
            error.innerHTML = this.error||"Nothing here";
            error.style.color = "red";
            this.wrapper.append(error);
        }
    }
}
