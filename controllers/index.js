const api = require(__base + 'controllers/api')
const public = require(__base + 'controllers/public')

function Controller (app) {
  api(app)
  public(app)
}

module.exports = Controller