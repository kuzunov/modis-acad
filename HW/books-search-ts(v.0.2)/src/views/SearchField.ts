export interface SearchField {
	type:string;
	checkBox:HTMLInputElement;
	textField:HTMLInputElement;
	html:HTMLDivElement;
}
export class SearchFieldImpl implements SearchField {
	checkBox:HTMLInputElement;
	textField:HTMLInputElement;
	html:HTMLDivElement;
	constructor(public type:string) {
		const newField = document.createElement("div");
		newField.className = type;
		let checkBox = document.createElement("input");
		const cbAttrs = {
			type: "checkBox",
			className: "checks",
			id: `search-${type.toLowerCase()}-check`,
		};
		setAttributes(checkBox, cbAttrs);

		checkBox.addEventListener("change", () => this.toggleField());

		const textField = document.createElement("input");
		const textAttrs: Record<string,any> = {
			type: "text",
			className: "search-box",
			id: `search-${type.toLowerCase()}`,
			disabled: "",
		};
		setAttributes(textField, textAttrs);
		// textField.addEventListener("input", (e) => {this.inputChange(e.target.value)})
		const label = document.createElement("label");
		label.innerHTML = type;
		label.appendChild(checkBox);
		newField.appendChild(label);
		newField.appendChild(textField);
		this.checkBox = checkBox;
		this.textField = textField;
		this.html = newField;
		return this;
	}
	toggleField = () => {
		this.textField.hasAttribute("disabled")
			? this.textField.removeAttribute("disabled")
			: this.textField.setAttribute("disabled", "disabled");
	};
}
function setAttributes(element:HTMLElement, attributes:Record<string,any>) {
	Object.keys(attributes).forEach((attr) => {
		element.setAttributeNS(null, attr, attributes[attr]);
	});
}
