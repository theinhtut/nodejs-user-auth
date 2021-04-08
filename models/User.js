const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  email: { type: String, reqiured: true },
  createdOn: { type: Date, default: Date.now() }
})

module.exports = model('Users', userSchema)
