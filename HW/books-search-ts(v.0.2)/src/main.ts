const searchWrapper = document.getElementById("search-wrapper")!;
const contentWrapper = document.getElementById("content-wrapper")!;

import { SearchField, SearchFieldImpl } from "./model/SearchField.js";
import { SearchBoxImpl, SearchBox } from "./model/SearchBox.js";
import { ContentManager, ContentManagerImpl } from "./model/ContentManager.js";
import { BookImpl } from "./model/Book.js";

const navBar = document.getElementsByTagName("nav")[0];
navBar.addEventListener("click", (e) => {
	e.stopImmediatePropagation();
	e.preventDefault();
	const targetEl = <HTMLElement>e.target;
	if (targetEl) {
		if (targetEl.tagName==="A") {
			if (targetEl.id === "search-nav") {
				window.history.replaceState(null,"","/search");
				cM.getBooks();
			} else if (targetEl.id === "favs-nav") {
				window.history.replaceState(null,"","/favourites");
				cM.getFavs();
			}
		}
	}
});

let fields:SearchField[] = [
	new SearchFieldImpl("Author"),
	new SearchFieldImpl("Title"),
	new SearchFieldImpl("Publisher"),
	new SearchFieldImpl("Subject"),
];
const cM:ContentManager = new ContentManagerImpl(new Map<string, BookImpl>(), contentWrapper);
const sb:SearchBox = new SearchBoxImpl(fields, searchWrapper,cM.getBooks);
if (window.location.pathname==="/favourites") {
	cM.getFavs();
}
