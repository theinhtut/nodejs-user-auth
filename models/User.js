const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  email: { type: String, reqiured: true, unique: true },
  password: { type: String, reqiured: true },
  createdOn: { type: Date, default: Date.now() }
})

model('Users', userSchema)
