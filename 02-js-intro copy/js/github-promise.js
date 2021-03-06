function demo() {
    const resultsElem = document.getElementById("results")
    fetch('users.json')
        .then(usersResp => usersResp.json())
        .then(users => {
            console.log(users);
            return Promise.all(users.map(user => {
                return fetch(`https://api.github.com/users/${users[0].username}`)
                .then (userResp => userResp.json())
            }));

        }).then(githubResp => githubResp.json())
        .then(gitUser => {
            console.log(gitUser);
            const img = new Image();
            img.src = gitUser.avatar_url
            resultsElem.appendChild(img);
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 10000, img)
            });
        }).then(img => {
            resultsElem.removeChild(img);
        })
        .finally(() => console.log("Demo finished."));
}

demo()