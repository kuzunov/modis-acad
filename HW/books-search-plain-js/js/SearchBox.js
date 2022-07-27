import { API_URL,GAPI_KEY } from "./config.js";
export class SearchBox {
	//fields for specific search, wrapper and manager Fn from ContentManager
	constructor(fields,wrapper,managerFn) {
		//get wrapper for specific search
		const specificWrapper = wrapper.querySelector("#specific-search");
		fields.map(f => {
			specificWrapper.appendChild(f.html);
		});
		//submit button for specific search
		let submit = document.createElement("button");
		submit.id="submit-btn";
		submit.innerHTML= "Submit";
		submit.addEventListener("click",() => this.handleSubmit());
		specificWrapper.appendChild(submit);
		specificWrapper.style.display = "none";
		//create broadsearch field
		let broadSearchField = document.createElement("input");
		broadSearchField.type = "text";
		broadSearchField.id = "broad-search-field";
		broadSearchField.addEventListener("keyup",() => this.handleBroadSearch());
		wrapper.appendChild(broadSearchField);
		//button for toggling between searches
		let spcSearchBtn = document.createElement("button");
		spcSearchBtn.innerHTML = "Toggle specific search";
		spcSearchBtn.addEventListener("click", ()=>{
			if (specificWrapper.style.display) {
				specificWrapper.style.removeProperty("display");
				broadSearchField.style.setProperty("display","none");
			} 
			else {
				specificWrapper.style.setProperty("display","none");
				broadSearchField.style.removeProperty("display");
			}
		});

		wrapper.appendChild(spcSearchBtn);
		//set properties
		this.broadSearchField = broadSearchField;
		this.fields = fields;
		this.manager = managerFn;
	}
	//search in all categories
	handleBroadSearch = () =>{
		window.history.replaceState(null,"","/search")
		const errorBox = document.getElementById("error");
		if (this.broadSearchField.value.length>2){
			//set search url
			let searchURL=`${API_URL}${this.broadSearchField.value.replace(" ","+")}&maxResults=10&key=${GAPI_KEY}`;
			//hide errors
			errorBox.innerHTML="";
			errorBox.style.display = "none";
			//call manager fn
			this.manager(searchURL);
		}else{
			//show error
			errorBox.style.display= "flex";
			errorBox.innerHTML="Type 3 or more characters and select a category to search!";
		}
	}
	//specific search
	handleSubmit = () =>{
		window.history.replaceState(null,"","/search")
		//build url
		let searchURL=API_URL;
		searchURL += this.fields.map((f)=> {
			if (!f.textField.hasAttribute("disabled")&&f.textField.value!=="") { 
				//category:split+keywords
				return `in${f.type.toLowerCase()}:${f.textField.value.replace(" ","+")}+`;
			}
		});
		//remove last + and append API_KEY
		searchURL=`${searchURL.slice(0,-1)}&maxResults=10&key=${GAPI_KEY}`;
		//call manager Fn with URL
		this.manager(searchURL);
        
	}
}