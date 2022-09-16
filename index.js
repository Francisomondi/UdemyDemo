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

    //logical operators
    //or
    //and
    const courses = await Course
        //.find({ author: "Unique mweni", isPublished: true })

        //.find().or([{ author: "Unique mweni" }, {  isPublished: true }]).and([])

        //starts with Unique
        .find({
            author: /^Unique/
        })
        //ends with omondi
        .find({
            author: /omondi$/i
        })
        //courses with author containing omo
        .find({
            author: /.*omo.*/i
        })

        .limit(10)
        .sort({
            name: 1
        })
        .select({
            name: 1,
            tags: 1
        })

    console.log(courses)

}

//updating courses
const updateCourse = async (id) => {
    const course = await Course.findById(id)
    if (!course) return;

    course.name = "Mstahiki mayor",
        course.price = 13,
        course.author = "walah bin walah",
        course.tags = ["kiswahili", "kitukuzwe"],
        course.isPublished = true

    const result = await course.save()
    console.log(result)
}
updateCourse("631b860a07c7cd0bba56a489")