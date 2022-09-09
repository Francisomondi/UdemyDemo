const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/playground")
    .then(() => {
        console.log("connected to mongodb")
    })
    .catch(err => console.error("cound not connect to the db" + err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean

})

const Course = mongoose.model("Course", courseSchema)

const createCourses = async () => {
    const course = new Course({
        name: "react tutors",
        author: "Francis Omondi",
        tags: ["react", "frontend"],
        isPublished: true
    })
    const result = await course.save()
    console.log(result)
}

const getCourses = async () => {
    const courses = await Course.find()
    console.log(courses)
}

getCourses()