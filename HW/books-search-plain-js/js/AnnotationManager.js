import {ANNO_URL} from "./config.js"
import { Annotation } from "./Annotation.js";

export class AnnotationManager {
    constructor (annotations) {
        this.annotations = annotations;
    }

    getAnnotations = async (fetchURL)=>{
		
		try{
		let returnArr = [];
		const response= await fetch(fetchURL);
		const annotations = await response.json();
			returnArr = annotations.reduce((returnArr,ann) => {
				const key = ann['bookId'];
				if (!returnArr[key]) { returnArr[key] = []}
				returnArr[key].push(new Annotation(ann.id, ann.bookId,ann.title,ann.body,ann.created,ann.modified,this));
				return returnArr;
		},[])
		return returnArr;
		
		}
		catch(error){
			console.log(error)
		}
	}
    displayAnnotations = (annotations, wrapper) => {
        annotations.forEach((ann) => {
            ann.render(wrapper);
          });
    }
	addAnnotation = async (annotation) => {
		try {
		const p = await fetch(`${ANNO_URL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(annotation)
		})
        const response = await p.json();
        return response.id;
	} catch(err){
		console.log(err)
	}
	}
	deleteAnnotation = async(annotId) => {
        const p = await fetch(`${ANNO_URL}/${annotId}`, {
            method: 'DELETE'
        })
	}
} 