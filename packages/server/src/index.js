require('dotenv/config')

const { build } = require('./app')
const { connectToDb } = require('./lib/utils/db')

const app = build()

connectToDb(() => {
  app.listen({ port: process.env.PORT || 5000 }, (err, address) => {
    if (err) return console.log(err)

    console.log(`Server is running at ${address}`)
  })
})

module.exports = async (req, res) => {
  await app.ready()
  app.server.emit('request', req, res)
}
