const API_BASE_URL = "http://localhost:3000/api/";
const form = document.getElementById("add-post-form");
form.addEventListener("submit", (e) => addPost(e));
const errorDiv = document.getElementById("error");

async function fetchPosts() {
  const postResponse = await fetch(`${API_BASE_URL}posts`);
  const post = await postResponse.json();
  results = document.getElementById("results");
  results.innerHTML = "";
  post
    .map((p) => {
      const postElem = document.createElement("div");
      postElem.className = "post-item";
      postElem.innerHTML = `<h3>${p.title}:</h3>${p.author}`;
      //update with parent catch event
      const deletebtn = document.createElement("button");
      deletebtn.addEventListener("click", () => deletePost(p.id));
      deletebtn.innerHTML = "X";
      deletebtn.className = "del-btn";

      const editButton = 

      postElem.appendChild(deletebtn);
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
    const data = {};
    for (const key of formData.keys()) {
      data[key] = formData.get(key);
    }
    const response = await fetch(`${API_BASE_URL}posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    errorDiv.innerHTML = "Done";

    form.reset();
    fetchPosts();
  } else {
    errorDiv.innerHTML = "Cannot have empty fields.";
  }
}
async function deletePost(id) {
  const response = await fetch(`${API_BASE_URL}posts/${id}`, {
    method: "DELETE",
  });
  errorDiv.innerHTML = (response.ok)? "Deleted!": response.statusText;
  fetchPosts();
}
fetchPosts();
