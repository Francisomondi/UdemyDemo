const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/playground")
    .then(() => {
        console.log("connected to mongodb")
    })
    .catch(err => console.error("cound not connect to the db" + err))

const courseSchema = new mongoose.Schema({
    name: String,
    price: Number,
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
        name: "thietheen tutors",
        price: 13,
        author: "ramogi Mwanzia",
        tags: ["thirteen", "frontend"],
        isPublished: true
    })
    const result = await course.save()
    console.log(result)
}

const getCourses = async () => {
    const courses = await Course
        .find({
            price: {
                $gte: 11
            }
        })
        .sort({
            name: 1
        })
        .select({
            name: 1,
            tags: 1
        })

    console.log(courses)
}
createCourses()
getCourses()