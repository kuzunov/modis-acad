export class SearchField {
    constructor(type, wrapper){
        const newField = document.createElement('div');
        newField.className = type;
        let checkBox = document.createElement("input");
        const cbAttrs = {
             "type": "checkBox",
             "className":"checks",
             "id":`search-${type.toLowerCase()}-check`,
            }
        setAttributes(checkBox,cbAttrs)

        checkBox.addEventListener('change', () => this.toggleField())

        const textField = document.createElement("input");
        const textAttrs = {
            type: "text",
             className:"search-box",
             id:`search-${type.toLowerCase()}`,
            }
            setAttributes(textField,textAttrs)
        // textField.addEventListener("input", (e) => {this.inputChange(e.target.value)})
        const label = document.createElement('label');
        label.innerHTML = type;
        label.appendChild(checkBox);
        newField.appendChild(label);
        newField.appendChild(textField);
        this.type = type;
        this.checkBox = checkBox;
        this.textField = textField;
        this.html = newField;
        return this;
    }
    inputChange() {

    }
    handleSubmit = () => {

    }
    toggleField = () => {
        (this.textField.hasAttribute("disabled"))? 
            this.textField.removeAttribute("disabled"):this.textField.setAttribute("disabled","disabled");
    }
}
function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
      element.setAttributeNS(null,attr, attributes[attr]);
    });
  }