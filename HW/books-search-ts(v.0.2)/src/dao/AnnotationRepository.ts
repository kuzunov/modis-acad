import { Annotation, AnnotationImpl } from "../model/Annotation.js";
import { IdType } from "../model/Shared.js";
import { RepositoryImpl, Repositry } from "./Repository.js";

export interface AnnotationRepository extends Repositry<Annotation> {
    getByQuery(q:string):Promise<Map<IdType,Annotation[]>>
};

export class AnnotationRepositoryImpl extends RepositoryImpl<Annotation> implements AnnotationRepository{
    constructor(public endpoint:string){
        super(endpoint);
    }
    async getByQuery(q: string): Promise<Map<IdType, Annotation[]>> {
        let returnMap = new Map<string,AnnotationImpl[]>();
        try {
            const response = await fetch(`${this.endpoint}/?${q}`);
            const annotations:AnnotationImpl[] = await response.json();
            annotations.forEach(ann => {
              const key = ann.bookId;
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