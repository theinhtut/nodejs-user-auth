const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('Users')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT_PUBLIC_KEY,
  algorithms: ['RS256'],
  jsonWebTokenOptions: {
    maxAge: '1d'
  }
}

const verifyCallback = (jwtPayload, done) => {
  console.log('jwtPayload: ' + jwtPayload)
  const userId = jwtPayload.id
  // TODO: Implement verifying JWT token
  // Custom password verification implementation
  done(null, {})
  // User.findOne({ id: userId })
  //   .then((user) => {
  //     if (!user) {
  //       return done(null, false)
  //     }
  //     return done(null, user)
  //   })
  //   .catch((err) => {
  //     done(err, false)
  //   })
}

const strategy = new JwtStrategy(jwtOptions, verifyCallback)

module.exports = (passport) => {
  passport.use(strategy)
}
