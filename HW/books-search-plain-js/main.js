const searchWrapper = document.getElementById("search-wrapper");
const contentWrapper = document.getElementById("content-wrapper");

import { SearchField } from "./js/SearchField.js";
import { SearchBox } from "./js/SearchBox.js";
import { ContentManager } from "./js/ContentManager.js";

let fields = [
	new SearchField("Author"),
	new SearchField("Title"),
	new SearchField("Publisher"),
	new SearchField("Subject"),
];
new SearchBox(fields, searchWrapper,new ContentManager([], contentWrapper).getBooks);
