console.log("before")
getUser(1, function (user) {
    console.log("user", user)
})
console.log("after")

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Getting a user from the datABASE....")

        callback({
            id: id,
            gitHubUsername: "moash"
        })

    }, 2000)
}