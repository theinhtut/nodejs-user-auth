const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

const User = mongoose.model('Users')

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
}

const verifyCallback = (email, password, done) => {
  console.log('I am in verifycallback')
  // Custom password verification implementation
  const user = new User({
    email: 'iamoverwriting@temp.com',
    password: 'anythingAtTheMoment'
  })
  console.log('email: ' + email)

  // done(null, false)
  done(null, user)
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
  console.log('user in serializeFn: ' + user)
  done(null, 112233)
})

passport.deserializeUser((id, done) => {
  console.log('id in deserializeUser: ' + id)
  const user = new User({
    email: 'deserializeUser@du.com',
    password: 'anythingAtTheMoment'
  })
  done(null, user)
})
