async function demo() {
  try {
    const resultsElem = document.getElementById("results");
    const usersResp = await fetch("users.json");
    const users = await usersResp.json();
    const gitUsers = await Promise.all(
      users.map(async (user) => {
        const userResp = await fetch(
          `https://api.github.com/users/${user.username}`
        );
        return await userResp.json();
      })
    );
    console.log(gitUsers);
    const images = gitUsers.map((gitUser) => {
      const img = new Image();
      img.src = gitUser.avatar_url;
      resultsElem.appendChild(img);
      return img;
    });
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
    images.forEach((element) => {
      resultsElem.removeChild(element);
    });
    return users
  } catch (err) {
    console.log("Error " + err);
  } finally {
    console.log("Demo finished.");
  }
}

demo().then(data => {
    console.log(data);
});
