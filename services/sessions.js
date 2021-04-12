/**
 * Session setup using 'express-session' and 'connect-mongo'
 */
const session = require('express-session')
const MongoStore = require('connect-mongo')
const keys = require('../config/keys')

const sessionStore = new MongoStore({
  mongoUrl: keys.MONGO_URI,
  collection: 'sessions'
})

module.exports = (app) => {
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
}
