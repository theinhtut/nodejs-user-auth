const express = require('express')
const User = require('./models/User')

const app = express()
app.use(express.json())
app.use(jsonErrHandler) // Handle bad request error
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()

// Setup MongoDB
require('./services/mongoDb')

function jsonErrHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err)
    return res.status(400).send({ status: 404, message: err.message }) // Bad request
  }
  next()
}

app.get('/', (req, res) => {
  res.send('❤')
})

// User routes
app.post('/api/user/register', (req, res) => {
  const user = new User({
    email: 'levi@aot.com'
  })
  console.log(req.body)
  res.status(200).send(user)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`The app is running on PORT: ${PORT}`)
})
