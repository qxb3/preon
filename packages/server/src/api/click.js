const urls = require('../lib/models/urls')

const opts = {
  schema: {
    response: {
      200: { $ref: 'url' }
    }
  }
}

module.exports = (fastify, _, done) => {
  fastify.post('/click', opts, async (req, reply) => {
    const { id } = req.query

    if (!id)
      return reply.badRequest('query \'id\' is required')

    try {
      const result = await urls.findOneAndUpdate(
        { id },
        { $inc: { clicks: 1 } },
        { new: true }
      )

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
