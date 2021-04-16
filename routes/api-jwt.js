const mongoose = require('mongoose')
const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = require('../config/keys').JWT_SECRET_KEY
const jwtAuth = require('../middlewares/jwtAuth').jwtAuth

module.exports = (app) => {
  const verifyJwt = (req, res, next) => {
    console.log('verifyJwt')
    const headerAuth = req.headers.authorization || ''
    // Check auth headers
    if (!headerAuth) {
      return res.status('400').send({ msg: 'Missing auth token' })
    }

    // Split into token parts and check
    const tokenParts = headerAuth.split(' ')
    const tokenType = tokenParts[0]
    const aToken = tokenParts[1] || ''
    if (tokenType !== 'Bearer' || aToken.match(/\S+\.\S+\.\S+/) === null) {
      return res.status('401').send({ msg: 'You are now authorized' })
    }

    // Verify JWT
    try {
      const verifiedToken = jwt.verify(aToken, JWT_SECRET_KEY, { algorithms: ['HS256'] })
      next()
    } catch (err) {
      console.log(err)
      return res.status('401').send({ msg: 'You are now authorized' })
    }
  }

  app.get('/test', verifyJwt, (req, res) => {
    res.status(200).send({
      msg: 'Testing from test route'
    })
  })
  app.get('/', (req, res) => {
    res.send('❤️')
  })

  app.post('/api/user/register', async (req, res) => {
    const User = mongoose.model('Users')

    // TODO: Refactor validation
    const { email, password } = req.body
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

      const user = new User({
        email,
        password: hashedPw
      })

      user
        .save()
        .then(() => {
          res.status(201).send({
            msg: 'Successfully registered user'
          })
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

  app.post('/api/user/login', jwtAuth)

  app.post('/api/user/logout', (req, res) => {
    req.logout()
    res.sendStatus(200)
  })

  app.get(
    '/api/user/protected-route',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      // console.log(req.headers.authorization)
      // const isAuth = req.isAuthenticated()
      // if (isAuth) {
      //   res.status(200).send({
      //     msg: 'You have made it to protected route!!!'
      //   })
      // } else {
      //   res.status(401).send({
      //     status: 401,
      //     msg: 'You are not authorized to view this. Please login.'
      //   })
      // }
      // console.log('req.isAuthenticated: ' + req.isAuthenticated())
      res.status(200).send({
        msg: 'Always returning 200 at the moment'
      })
    }
  )
}
