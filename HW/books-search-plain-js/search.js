const errorBox = document.getElementById("error");
const searchBy = document.getElementById("search-by-input");
const searchWrapper = document.getElementById("search-wrapper")
const submit = document.getElementById("submit-btn");

import { SearchField } from './SearchField.js';
import { SearchBox } from './SearchBox.js';
// searchBox.forEa.addEventListener("input", (e) => inputChange(e.target.value,searchBy.value));
// searchBy.addEventListener("input", (e) => inputChange(searchBox.value,e.target.value));


let fields = [new SearchField("Author"),
            new SearchField("Title"),
            new SearchField("Publisher"),
            new SearchField("Subject")];
let searchBox = new SearchBox(fields,submit,searchWrapper);
const inputChange = () => {
   if (searchBox.value.length>2&&searchBy.value) { 
         errorBox.style.display= "none"; 
        handleSearch(searchBox.value,searchBy.value); 
    } 
    else {
        errorBox.style.display= "flex";
        errorBox.innerHTML="Type 3 or more characters and select a category to search!";
    }
}
const handleSearch = (searchStr,searchBy)=>{
    let searchIn = "in";
        searchIn=searchIn+searchBy.toLowerCase()+":"+searchStr.toLowerCase();
    console.log(API_URL+searchIn+"&key="+GAPI_KEY);
};
const handleCheck = () => {

}