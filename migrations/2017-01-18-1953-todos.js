const __base = __dirname + '/'
const Todo = require(__base + '../model/todo')

exports.up = function (next) {
  Todo.create({
    name: 'Be present',
    completed: true
  })
  Todo.create({
    name: 'Wrap someone in a hug',
    completed: true
  })
  Todo.create({
    name: 'Gift a smile to a stranger',
    completed: true
  })
  Todo.create({
    name: 'Make love'
  })
  Todo.create({
    name: 'Be the light'
  })

  console.log('    --> This is migration 2017-01-18-1953-todos.js being applied')
  next()
}

exports.down = function (next) {
  Todo.remove({}, err => {
    if (err) return handleError(err)
  })

  console.log('    --> This is migration 2017-01-18-1953-todos.js being rollbacked')
  next()
}
