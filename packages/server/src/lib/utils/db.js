const mongoose = require('mongoose')

exports.requiredType = function(type, options = {}) {
  return { type, ...options }
}

exports.createSchema = function(name, schema) {
  return mongoose.model(name, new mongoose.Schema(schema))
}

exports.connectToDb = function(callbackFn) {
  mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) return console.log(err)

    console.log('Connected to database')
    callbackFn()
  })
}
