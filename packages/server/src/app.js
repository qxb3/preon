const fastify = require('fastify')

exports.build = function() {
  const app = fastify()

  app.register(require('@fastify/cors'))
  app.register(require('@fastify/sensible'))

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

  app.register(require('./api/shorten'), { prefix: '/api' })
  app.register(require('./api/get'), { prefix: '/api' })
  app.register(require('./api/click'), { prefix: '/api' })

  return app
}
