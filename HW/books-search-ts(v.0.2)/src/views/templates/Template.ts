export interface Template<T> {
    DOMElements:HTMLElement[]
    createDOMElements(entity:T):void
    render(wrapper:HTMLDivElement):void
}
export abstract class TemplateImpl<T> implements Template<T> {
    DOMElements: HTMLElement[] = [];
    abstract createDOMElements(entity: T): void;
    render(wrapper:HTMLDivElement){
        wrapper.replaceChildren(...this.DOMElements)
    }
}