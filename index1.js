console.log("Before");

//getUser(1, (user) => {
//getRepositories(user.gitHubUsername, (repos) => {
//getCommits(repos[0], (commits) => {
//console.log(commits);
//})
//})
//});
const displayCommits = async () => {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);

    console.log(commits);
  } catch (error) {
    console.log(error);
  }
};

displayCommits();

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({
        id: id,
        gitHubUsername: "Francis"
      });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["commit"]);
    }, 2000);
  });
}
