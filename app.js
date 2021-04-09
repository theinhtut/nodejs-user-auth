const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const keys = require('./config/keys')
const User = require('./models/User')

require('dotenv').config()

// Setup MongoDB
require('./services/mongoDb')

const app = express()

app.use(express.json())
app.use(jsonErrHandler) // Handle bad request error
app.use(express.urlencoded({ extended: true }))

function jsonErrHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err)
    return res.status(400).send({ status: 404, message: err.message }) // Bad request
  }
  next()
}

/**
 * Session setup
 */
const sessionStore = new MongoStore({
  mongoUrl: keys.MONGO_URI,
  collection: 'sessions'
})
app.use(
  session({
    secret: keys.SESSIONS_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
)

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
