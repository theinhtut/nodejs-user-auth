const express = require('express')
const passport = require('passport')

/**
 * Helpers imports
 */
const { jsonErrHandler } = require('./helpers/helpers')

/**
 * Environment variables
 */
require('dotenv').config()

/**
 * MongoDB setup
 */
require('./services/mongoDb')

/**
 * Models setup
 */
require('./models/User')

/**
 * Express middlewares setup
 */
const app = express()
app.use(express.json())
app.use(jsonErrHandler) // Handle bad request error
app.use(express.urlencoded({ extended: true }))

/**
 * Passport authentication setup
 */
require('./services/passport-jwt')(passport)
app.use(passport.initialize())

/**
 * Routes
 */
require('./routes/api-jwt')(app)

// Final catch error
// app.use((req, res, next) => {
//   res.status(404).send({
//     status: 404,
//     msg: 'Not found'
//   })
// })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`The app is running on PORT: ${PORT}`)
})
