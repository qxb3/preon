require('dotenv/config')

const { build } = require('../src/app')
const { connectToDb } = require('../src/lib/utils/db')

connectToDb(() => {
  const app = build()

  app.listen({ port: process.env.PORT || 5000 }, (err, address) => {
    if (err) return console.log(err)

    console.log(`Server is running at ${address}`)
  })

  module.exports = async (req, res) => {
    await app.ready()

    app.server.emit('request', req, res)
  }
})
