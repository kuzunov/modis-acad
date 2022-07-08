import { API_URL,GAPI_KEY } from "./constants.js";
export class SearchBox {
    constructor(fields,wrapper) {
        fields.map(f => {
            wrapper.appendChild(f.html);
        })
        let submit = document.createElement("button")
        submit.id="submit-btn";
        submit.innerHTML= "Submit";
        submit.addEventListener("click", this.handleSubmit.bind(this))
        wrapper.appendChild(submit);
        this.fields = fields;
    }
    handleSubmit(){
        let searchURL=API_URL;
        this.fields.map(f=> {
            (!f.textField.hasAttribute("disabled")||!f.textField.value!=="") ? 
                searchURL+=`in${f.type.toLowerCase()}:${f.textField.value}+`:
                searchURL+=""
        })
        // searchIn=searchIn+searchBy.toLowerCase()+":"+searchStr.toLowerCase();
        searchURL+=`&key=${GAPI_KEY}`;
        console.log(searchURL);
        //async//await//split string for multiple keywords
    }
}