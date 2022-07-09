import { API_URL,GAPI_KEY } from "./constants.js";
export class SearchBox {
    //fields for specific search, wrapper and manager Fn from ContentManager
    constructor(fields,wrapper,managerFn) {
        fields.map(f => {
            wrapper.appendChild(f.html);
        })
        let submit = document.createElement("button")
        submit.id="submit-btn";
        submit.innerHTML= "Submit";
        submit.addEventListener("click",() => this.handleSubmit())
        wrapper.appendChild(submit);
        this.fields = fields;
        this.manager = managerFn;
    }
    //search in all categories
    broadSearch(){
        let searchURL=API_URL;
    }
    //specific search
    handleSubmit(){
        //build url
        let searchURL=API_URL;
        this.fields.forEach((f)=> {
            if (!f.textField.hasAttribute("disabled")&&f.textField.value!=="") { 
                //category:split+keywords
                searchURL+=`in${f.type.toLowerCase()}:${f.textField.value.replace(" ","+")}+`
            }
        })
        //remove last + and append API_KEY
        searchURL=`${searchURL.slice(0,-1)}&key=${GAPI_KEY}`;
        //call manager Fn with URL
        this.manager(searchURL);
        
    }
    // const inputChange = () => {
//    if (searchBox.value.length>2&&searchBy.value) { 
//          errorBox.style.display= "none"; 
//         handleSearch(searchBox.value,searchBy.value); 
//     } 
//     else {
//         errorBox.style.display= "flex";
//         errorBox.innerHTML="Type 3 or more characters and select a category to search!";
//     }
// }
// const handleSearch = (searchStr)=>{
//     let searchIn = "in";
//         searchIn=searchIn+searchBy.toLowerCase()+":"+searchStr.toLowerCase();
//     console.log(API_URL+searchIn+"&key="+GAPI_KEY);
// };
}