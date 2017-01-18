global.__base = __dirname + '/'

const express = require('express')
const favicon = require('serve-favicon')
const db = require(__base + 'db/mongoose')
const config = require(__base + '/config/app')
const controller = require(__base + 'controllers/index')

// Init Express server
const app = express()

// Init DB connection
app.db = db()
app.db.init()

// Init App controller
app.controller = controller(app)

// Middleware
app.use(express.static('public'))
app.use(favicon(__base + '/public/favicon.ico'))

// Listen to connections. Default port: 2017
const server = app.listen(config.port, () => {
  let port = server.address().port

  console.log('Server running on http://localhost:%s', port)
})