import { Annotation, AnnotationImpl } from "../Annotation.js";
import { IdType } from "../../Shared.js";
import { RepositoryImpl, Repositry } from "./Repository.js";
import { ANNO_URL } from "../../config.js";

export interface AnnotationRepository extends Repositry<Annotation> {
    getByQuery(q:string):Promise<Map<IdType,Annotation[]>>
};

class AnnotationRepositoryImpl extends RepositoryImpl<Annotation> implements AnnotationRepository{
    constructor(public endpoint:string){
        super(endpoint);
    }
    async getByQuery(q: string): Promise<Map<IdType, Annotation[]>> {
        let returnMap = new Map<string,Annotation[]>();
        try {
            const response = await fetch(`${this.endpoint}/?${q}`);
            const annotations:Annotation[] = await response.json();
            annotations.forEach(ann => {
              const key = ann.bookId?.toString();
              if (key) 
              (returnMap.get(key))?
              returnMap.set(key,[
                    new AnnotationImpl(
                      ann.id,
                      ann.bookId,
                      ann.title,
                      ann.body,
                      ann.created,
                      ann.modified
                    ),...returnMap.get(key)!]):returnMap.set(key,[])
              }
            );
          } catch (error) {
            console.log(error);
          }
          return returnMap
    }
}
export const AnnotationRepository = new AnnotationRepositoryImpl(ANNO_URL);