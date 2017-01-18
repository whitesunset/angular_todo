const mongoose = require('mongoose')

// Define DB Schema for Model
let TodoSchema = new mongoose.Schema({
  name: String,
  completed: {
    type: Boolean,
    default: false
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

// Define Model based on Schema
let Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo