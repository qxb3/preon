require('dotenv/config')

const { build } = require('./app')
const { connectToDb } = require('./lib/utils/db')

connectToDb(() => {
  const app = build()

  app.listen({ port: process.env.PORT || 5000 }, (err, address) => {
    if (err) return console.log(err)

    console.log(`Server is running at ${address}`)
  })
})
