const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne({
    _id: courseId
  }, {
    $unset: {
      'author': ""
    }
  })
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId)
  course.authors.push(author)
  course.save()
}

addAuthor("6329e308a0ff92c22dd9888c", new Author({
  name: "camih camilah"
}))

//updateAuthor('6329c44636099704a0760baa')