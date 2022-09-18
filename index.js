const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/playground")
    .then(() => {
        console.log("connected to mongodb")
    })
    .catch(err => console.error("cound not connect to the db" + err))

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20

    },
    price: Number,
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (value) {
                return value.length > 0
            },
            message: "this course should have atleast one tag"
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished
        }
    }

})

const Course = mongoose.model("Course", courseSchema)

const createCourse = async () => {
    const course = new Course({
        name: "thietheen tutors",
        price: 13,
        author: "ramogi Mwanzia",
        tags: ["the tag"],
        isPublished: true,

    })
    try {
        const result = await course.save()
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }

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


//remove a document
const removeCourse = async (id) => {
    const result = await Course.deleteOne({
        _id: id
    })

    console.log(result)
}


removeCourse("631bc3a5aed7f61ed3af4231")