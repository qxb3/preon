const mongoose = require('mongoose')

exports.requiredType = (type, options = {}) => {
  return { type, ...options }
}

exports.createSchema = (name, schema) => {
  return mongoose.model(name, new mongoose.Schema(schema))
}

exports.connectToDb = (callbackFn) => {
  mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) return console.log(err)

    console.log('Connected to database')
    callbackFn()
  })
}

let connection = null
exports.connectToDbServerless = async () => {
  if (!connection) {
    connection = await mongoose.connect(process.env.MONGO_URI).catch(err => {throw new Error(err) })
  }

  return connection
}
