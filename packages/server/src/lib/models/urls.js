const { createSchema, requiredType } = require('../utils/db')
const { validateUrl } = require('../utils/others')
const crypto = require('crypto')

module.exports = createSchema('urls', {
  id: {
    type: String,
    default: crypto.randomBytes(6).toString('base64url'),
    unique: true
  },
  url: requiredType(String, { validate: { validator: validateUrl } }),
  origin: requiredType(String, { validate: { validator: validateUrl } }),
  clicks: {
    type: Number,
    default: 0
  }
})
