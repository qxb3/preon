const fastify = require('fastify')

exports.build = function() {
  const app = fastify()

  app.register(require('@fastify/cors'), {
    origin: /(preon\.tk$|http:\/\/localhost:\d+)/
  })
  app.register(require('@fastify/sensible'))
  app.register(require('@fastify/multipart'))

  app.addSchema({
    $id: 'url',
    type: 'object',
    properties: {
      id: { type: 'string' },
      url: { type: 'string' },
      origin: { type: 'string' },
      clicks: { type: 'integer' }
    }
  })

  app.register(require('./routes/shorten'), { prefix: '/api' })
  app.register(require('./routes/get'), { prefix: '/api' })
  app.register(require('./routes/click'), { prefix: '/api' })

  return app
}
