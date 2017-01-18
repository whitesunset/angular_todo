const mongoose = require('mongoose')
const db = require(__base + '/config/app')
const Todo = require(__base + 'model/todo')

// Wrap CRUD methods, so we can change DB provider without changing API code

function MongooseProvider () {
  this.create = json => {
    let todo = new Todo(json)

    return todo.save()
  }

  this.read = () => {
    return Todo.find()
  }

  this.readById = (id) => {
    return Todo.findById(id)
  }

  this.updateById = (id, json) => {
    return Todo.findByIdAndUpdate(id, json)
  }

  this.deleteById = (id) => {
    return Todo.findByIdAndRemove(id)
  }

  // Se up Mongoose
  this.init = () => {
    // Use default Promises
    mongoose.Promise = global.Promise

    // Connect to Mongo via Mongoose
    mongoose.connect('mongodb://localhost/' + db.db_name)
      .then(() => {
        console.log('MongoDB connected')
      })
      .catch(err => {
        console.error(err)
      })
  }

  return this
}

module.exports = MongooseProvider