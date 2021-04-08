const mongoose = require('mongoose')
const MONGO_URI = require('../config/keys').MONGO_URI

/**
 * Setup MongoDB connection
 */
console.log('Connecting to MongoDB...')
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB is now connected.')
  })
  .catch((err) => {
    console.log(`MongoDB connection failed: ${err}`)
  })
