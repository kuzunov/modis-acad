const searchWrapper = document.getElementById("search-wrapper");
const contentWrapper = document.getElementById("content-wrapper");

import { SearchField } from "./SearchField.js";
import { SearchBox } from "./SearchBox.js";
import { ContentManager } from "./ContentManager.js";
// searchBox.forEa.addEventListener("input", (e) => inputChange(e.target.value,searchBy.value));
// searchBy.addEventListener("input", (e) => inputChange(searchBox.value,e.target.value));

let fields = [
	new SearchField("Author"),
	new SearchField("Title"),
	new SearchField("Publisher"),
	new SearchField("Subject"),
];

new SearchBox(fields, searchWrapper, new ContentManager([], contentWrapper).getBooks);
