const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bcrypt = require('bcrypt')
const keys = require('./config/keys')

require('dotenv').config()

// Setup MongoDB
require('./services/mongoDb')

/**
 * Setup models
 */
require('./models/User')

const app = express()

app.use(express.json())
app.use(jsonErrHandler) // Handle bad request error
app.use(express.urlencoded({ extended: true }))

function jsonErrHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err)
    return res.status(400).send({ status: 400, msg: 'Bad request' }) // Bad request
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

/**
 * Passport Authentication
 */
require('./services/passport')
app.use(passport.initialize())
app.use(passport.session())

/**
 * Routes
 */

app.get('/', (req, res) => {
  res.send('❤')
})

// User routes
app.post('/api/user/register', async (req, res) => {
  const User = mongoose.model('Users')

  // TODO: Refactor validation
  const { email, password } = req.body
  console.log('email: ' + email)
  console.log('password: ' + password)
  if (!email || !password) {
    console.log('email or password is empty')
    return res.status(400).send({
      msg: 'Bad request'
    })
  }

  // TODO: Refactor hashing password
  try {
    const salt = await bcrypt.genSalt(11)
    const hashedPw = await bcrypt.hash(password, salt)
    console.log('salt: ' + salt)
    console.log('hashedPw: ' + hashedPw)

    const user = new User({
      email,
      password: hashedPw
    })

    user
      .save()
      .then((u) => {
        console.log(`Successfully saved user: ${u}`)
        res.status(201).send(user)
      })
      .catch((err) => {
        console.log(err)
        res.status(422).send({ msg: 'Unable to register new user' })
      })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ msg: 'Oops! Something went wrong!' })
  }
})

app.post(
  '/api/user/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    console.log(req)
    res.send(200)
  }
)

app.post('/api/user/logout', (req) => {
  req.logout()
})

app.get('/api/user/protected-route', (req, res, next) => {
  const isAuth = req.isAuthenticated()
  if (isAuth) {
    res.status(200).send({
      msg: 'You have made it to protected route!!!'
    })
  } else {
    res.status(401).send({
      status: 401,
      msg: 'You are not authorized to view this. Please login.'
    })
  }
  console.log('req.isAuthenticated: ' + req.isAuthenticated())
})

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
