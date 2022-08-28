require('dotenv/config')

const { build } = require('../src/app')
const { connectToDb } = require('../src/lib/utils/db')

connectToDb(() => {
  const app = build()

  module.exports = async (req, res) => {
    await app.ready()

    app.server.emit('request', req, res)
  }
})
