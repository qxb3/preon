const urls = require('../lib/models/urls')

const opts = {
  schema: {
    response: {
      200: { $ref: 'url' }
    }
  }
}

module.exports = (fastify, _, done) => {
  fastify.get('/get', opts, async (req, reply) => {
    const { id } = req.query

    if (!id)
      return reply.badRequest('query \'id\' is required')

    try {
      const result = await urls.findOne({ id })
      if (!result)
        return reply.notFound(`there is no shortened url with id of ${id}`)

      reply.send(result)
    } catch(err) {
      console.log(err)
      reply.internalServerError()
    }
  })

  done()
}
