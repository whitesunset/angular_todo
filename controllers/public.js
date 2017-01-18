function Controller (app) {
  // App home
  app.get('/', (req, res) => {
    res.sendFile(__base + '/public/index.html')
  })
}

module.exports = Controller