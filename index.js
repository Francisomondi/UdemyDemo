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
        //.find({
        //   author: "Unique mweni",
        // isPublished: true
        // })
        .find({
            price: {
                $in: [10, 15, 30]
            }
        })
    console.log(courses)

}
getCourses()