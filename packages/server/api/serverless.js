const { build } = require('../src/app')
const { connectToDb } = require('../src/lib/utils/db')

let connectedToDb = false

const app = build()

module.exports = async (req, res) => {
  if (!connectedToDb) {
    connectToDb(() => {
      connectedToDb = true
      console.log('Connected to database.')
    })
  }

  await app.ready()
  app.server.emit('request', req, res)
}
