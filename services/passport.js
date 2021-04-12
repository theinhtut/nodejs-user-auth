const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = mongoose.model('Users')

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
}

const verifyCallback = (email, password, done) => {
  // Custom password verification implementation
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return done(null, false)
      }
      // Check password valid
      const hashedPw = user.password
      bcrypt
        .compare(password, hashedPw)
        .then((result) => {
          if (result) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
        .catch((err) => {
          console.log(err)
          done(err)
        })
    })
    .catch((err) => {
      done(err)
    })
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user)
    })
    .catch((err) => {
      done(err)
    })
})
