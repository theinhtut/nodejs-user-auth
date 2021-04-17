const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const JWT_SECRET_KEY = require('../config/keys').JWT_SECRET_KEY

const User = mongoose.model('Users')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
  algorithms: ['HS256'],
  jsonWebTokenOptions: {
    maxAge: '1d'
  }
}

const verifyCallback = (jwtPayload, done) => {
  const userId = jwtPayload.id
  // Custom password verification implementation
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    })
    .catch((err) => {
      done(err, false)
    })
}

const strategy = new JwtStrategy(jwtOptions, verifyCallback)

module.exports = (passport) => {
  passport.use(strategy)
}
