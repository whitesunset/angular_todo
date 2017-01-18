const bodyParser = require('body-parser')
const config = require(__base + 'config/app')
const api_url = config.api_url
const jsonParser = bodyParser.json()

function Controller (app) {
  const error = (res, err) => {
    res.status(404).send(err.message)
    console.error('error:', err)
  }

  // REST Server docs with examples, blackjack and hookers
  app.get(api_url + '/docs', (req, res) => {
    res.sendFile(__base + '/public/api/docs.html')
  })

  // CREATE item
  app.post(api_url + '/create', jsonParser, (req, res) => {
    app.db.create(req.body)
      .then(model => {
        res.json(model)
        console.log('model created:', model)
      })
      .catch(error.bind(this))
  })

  // READ items
  app.get(api_url + '/items', (req, res) => {
    app.db.read()
      .then(models => {
        res.json(models)
        console.log('models list retrieved')
      })
      .catch(error.bind(this, res))
  })

  //READ item
  app.get(api_url + '/item/:id', (req, res) => {
    app.db.readById(req.params.id)
      .then(model => {
        res.json(model)
        console.log('model retrieved:', model)
      })
      .catch(error.bind(this, res))
  })

  // UPDATE item
  app.put(api_url + '/item/:id', jsonParser, (req, res) => {
    app.db.updateById(req.params.id, req.body)
      .then(model => {
        res.json(model)
        console.log('model updated:', model)
      })
      .catch(error.bind(this, res))
  })

  // DELETE item
  app.delete(api_url + '/item/:id', (req, res) => {
    app.db.deleteById(req.params.id)
      .then(model => {
        res.json(model)
        console.log('model deleted:', model._id)
      })
      .catch(error.bind(this, res))
  })
}

module.exports = Controller