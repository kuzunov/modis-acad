const searchWrapper = document.getElementById("search-wrapper");
const contentWrapper = document.getElementById("content-wrapper");

import { SearchField } from "./js/SearchField.js";
import { SearchBox } from "./js/SearchBox.js";
import { ContentManager } from "./js/ContentManager.js";
const navBar = document.getElementsByTagName("nav")[0];
navBar.addEventListener("click", (e) => {
	e.stopImmediatePropagation();
	e.preventDefault();
	if (e.target.tagName==="A") {
		if (e.target.id === "search-nav") {
			window.history.replaceState(null,"","/search");
			cM.getBooks();
		} else if (e.target.id === "favs-nav") {
			window.history.replaceState(null,"","/favourites");
			cM.getFavs();
		}
	}
});

let fields = [
	new SearchField("Author"),
	new SearchField("Title"),
	new SearchField("Publisher"),
	new SearchField("Subject"),
];
const cM = new ContentManager([], contentWrapper);
const sb = new SearchBox(fields, searchWrapper,cM.getBooks);
if (window.location.pathname==="/favourites") {
	cM.getFavs();
}
