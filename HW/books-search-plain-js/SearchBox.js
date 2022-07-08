import { API_URL,GAPI_KEY } from "./constants.js";
export class SearchBox {
    constructor(fields,submit,wrapper) {
        fields.map(f => {
            wrapper.appendChild(f.html);
        })
        wrapper.appendChild(submit);
        submit.addEventListener("click", this.handleSubmit.bind(this))
        this.fields = fields;
    }
    handleSubmit(){
        let searchURL=API_URL;
        this.fields.map(f=> {
            (!f.textField.hasAttribute("disabled")) ? 
                searchURL+=`in${f.type.toLowerCase()}:${f.textField.value}+`:
                searchURL+=""
        })
        // searchIn=searchIn+searchBy.toLowerCase()+":"+searchStr.toLowerCase();
        searchURL+=`&key=${GAPI_KEY}`;
        console.log(searchURL);
    }
}