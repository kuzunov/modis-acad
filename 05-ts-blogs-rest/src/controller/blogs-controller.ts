import { BlogsApi } from "../service/blogs-api-client.js";
import { Post } from "../model/posts.js";


export class BlogsController {
    postsSection = document.getElementById("posts")!;
    errorsDiv = document.getElementById("errors")!;

    async init(){
        try {
            const allPosts = await BlogsApi.getAllPosts();
            console.log("All posts:");
            this.showPostDom(allPosts);
        
        } catch (err) {
            this.showErrorsDom(err)
        }
    }
showPostDom(allPosts: Post[]) {
    allPosts.forEach(post => {
        this.addPostDom(post)
    })
}
addPostDom(post: Post) {
    const postElem = document.createElement("article");
    postElem.setAttribute("id", post.id.toString());
    postElem.className = "col s12 m6 14";
    this.updateArticleInnerHTML(postElem, post);
    this.postsSection.insertAdjacentElement('beforeend',postElem)
}
    updateArticleInnerHTML(postElem: HTMLElement, post: Post) {
        postElem.innerHTML = `
          <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${post.imgUrl}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
            <p>Author: ${post.authorId}, Tags: ${post.tags ? post.tags.join(', ') : 'no tags'}</p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
            <p>${post.content}</p>
          </div>
          <div class="card-action">
            <button class="btn waves-effect waves-light" type="button" id="edit${post.id}">Edit
              <i class="material-icons right">send</i>
            </button>
            <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete${post.id}">Delete
              <i class="material-icons right">clear</i>
            </button>
          </div>
          </div>
          `;
        // postElem.querySelector(`#delete${post.id}`)!.addEventListener('click', event => this.deletePost(post.id))
        // postElem.querySelector(`#edit${post.id}`)!.addEventListener('click', event => this.editPost(post))
    }
showErrorsDom(error:any) {
return;
}
    
}