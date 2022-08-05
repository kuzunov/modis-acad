import {Post, PostCreateDto} from "../model/posts.js"
import { IdType } from "../model/shared-types.js"
export interface BlogsApiClient {
    getAllPosts():Promise<Post[]>;
    getPostById(id:IdType):Promise<Post>;
    addNewPost(post:PostCreateDto):Promise<Post>;
    updatePost(post:Post):Promise<Post>;
    deletePostById(id:IdType):Promise<Post>;
}
const BASE_API_URL = "http://localhost:4000/api/posts";
class BlogsApiClientImpl implements BlogsApiClient {
    async getAllPosts(): Promise<Post[]> {
        return this.handleRequest(BASE_API_URL);
    }
    async getPostById(id: number): Promise<Post> {
        return this.handleRequest(`${BASE_API_URL}/${id}`);
    }
    async addNewPost(post: PostCreateDto): Promise<Post> {
        return this.handleRequest(BASE_API_URL, {
            method:"POST",
            headers:{'content-type':"application/json"},
            body:JSON.stringify(post),
        });
    }
    async updatePost(post: Post): Promise<Post> {
        return this.handleRequest(`${BASE_API_URL}/${post.id}`, {
            method:"PUT",
            headers:{'content-type':"application/json"},
            body:JSON.stringify(post),
        });
    }
    async deletePostById(id:IdType): Promise<Post> {
        return this.handleRequest(`${BASE_API_URL}/${id}`,{
            method:"DELETE",
        })
    }
    private async handleRequest(url:string,options?:RequestInit){
        try {
            const postsResposne = await fetch(url,options);
            if (postsResposne.status >= 400) {
                return Promise.reject(postsResposne.body);
            }
            return postsResposne.json()
        } catch(error) {
            return Promise.reject(error);
        }
    }
}
export const BlogsApi: BlogsApiClient = new BlogsApiClientImpl();