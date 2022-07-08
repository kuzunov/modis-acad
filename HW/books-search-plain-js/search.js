const searchBoxes = document.getElementsByClassName("search-box");
const errorBox = document.getElementById("error");
const searchBy = document.getElementById("search-by-input");
const checks = document.getElementsByClassName("checks");
const searchWrapper = document.getElementById("search-wrapper")

// searchBox.forEa.addEventListener("input", (e) => inputChange(e.target.value,searchBy.value));
// searchBy.addEventListener("input", (e) => inputChange(searchBox.value,e.target.value));

class SearchField {
    constructor(type){
        const submit = document.getElementById("submit-btn");
        submit.addEventListener("click", this.handleSubmit())
        const newEl = document.createElement('div');
        newEl.className = type;
        let checkBox = document.createElement("input");
        const cbProps = {type: "checkBox", className:"checks",id:`search-${type.toLowerCase()}-check`,innerHTML:type}
        // checkBox.type = "checkbox"
        // checkBox.className = "checks";
        // checkBox.id = `search-${type.toLowerCase()}-check`
        // checkBox.innerHTML = type;
        checkBox = {...checkBox,...cbProps};
        checkBox.addEventListener('change', this.toggleField())
        console.log(checkBox)
        const textField = document.createElement("input");
        textField.type = "text";
        textField.className = "search-box";
        textField.id = `search-${type.toLowerCase()}-field`
        // newEl.innerHTML = `<input type="checkbox" class = "checks" id=search-${type.toLowerCase()}-check>${type}</input>
        //                     <input type="text" class="search-box" id=search-${type.toLowerCase()}-field></input>`
        checkBox.addEventListener();
        // textField.addEventListener("input", (e) => {this.inputChange(e.target.value)})
        newEl.appendChild(checkBox);
        newEl.appendChild(textField);
        searchWrapper.appendChild(newEl);
    }
    inputChange() {

    }
    handleSubmit = () => {

    }
    toggleField = () => {
        console.log(this.textField.style.visibilty)
    }
}
let test = new SearchField("Author");


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