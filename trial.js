console.log("before")
getUser(1, (user) => {
    console.log("user", user)


    getRepositories(user.gitHubUsername, (repos) => {
        {
            console.log("Repos", repos)
        }
    })


})





console.log("after")

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Getting a user from the datABASE....")

        callback({
            id: id,
            gitHubUsername: "Francis"
        })

    }, 2000)
}

//get repoasitories
function getRepositories(username, callback) {
    setTimeout(() => {
        console.log("geting users repositories.....")
        callback(["repo1", "repo2", "repo3"])
    }, 2000)


}