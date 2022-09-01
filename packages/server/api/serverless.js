const { build } = require('../src/app')
const { connectToDbServerless } = require('../src/lib/utils/db')

const app = build()

module.exports = async (req, res) => {
  await connectToDbServerless()
  await app.ready()

  app.server.emit('request', req, res)
}
