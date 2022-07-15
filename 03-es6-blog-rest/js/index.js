const API_BASE_URL = "http://localhost:3000/api/";
const form = document.getElementById("add-post-form");
form.addEventListener("submit", (e) => addPost(e));
const errorDiv = document.getElementById("error");

async function fetchPosts() {
  const postResponse = await fetch(`${API_BASE_URL}posts`);
  const post = await postResponse.json();
  results = document.getElementById("results");
  console.log(post);
  post
    .map((p) => {
      const postElem = document.createElement("div");
      postElem.className = "post-item";
      postElem.innerHTML = `<h3>${p.title}:</h3>${p.author}`;
      return postElem;
    })
    .forEach((elem) => {
      results.appendChild(elem);
    });
}
async function addPost(e) {
  e.preventDefault();
  const formData = new FormData(form);
  if (formData.get("title") && formData.get("author")) {
    errorDiv.innerHTML = "";
    const response = await fetch(`${API_BASE_URL}posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": formData.get("title"),
        "author": formData.get("author"),
      }),
    });
    errorDiv.innerHTML = "Done";
    
  } else {
    errorDiv.innerHTML = "Type all the stuffs";
  }
}
fetchPosts();
