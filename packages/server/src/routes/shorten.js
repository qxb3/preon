const urls = require('../lib/models/urls')
const { validateUrl } = require('../lib/utils/others')
const crypto = require('crypto')

const opts = {
  schema: {
    response: {
      200: { $ref: 'url' }
    }
  }
}

module.exports = (fastify, _, done) => {
  fastify.post('/shorten', opts, async (req, reply) => {
    const { url, hostname } = req.query

    if (!url) return reply.badRequest('query \'url\' is required')
    if (!validateUrl(url)) return reply.badRequest('url is not a valid link')

    if (!hostname) return reply.badRequest('query \'hostname\' is required')
    if (!validateUrl(hostname)) return reply.badRequest('hostname is not a valid link')

    try {
      const id = crypto.randomBytes(6).toString('base64url')
      const result = await urls.create({
        id,
        url: `${hostname.replace(/\/$/, '')}/${id}`,
        origin: url
      })

      reply.send(result)
    } catch(err) {
      console.log(err)
      reply.internalServerError()
    }
  })

  done()
}
