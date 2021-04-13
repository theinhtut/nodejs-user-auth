/**
 * Authenticate user
 */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const issueJwt = require('../helpers/issueJwt')

const User = mongoose.model('Users')

const jwtAuth = (req, res, next) => {
  // Custom password verification implementation
  const { email, password } = req.body
  if (!email || !password) {
    console.log('email or password is empty')
    return res.status(400).send({
      msg: 'Bad request'
    })
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: 'User not found!' })
      }
      // Check password valid
      const hashedPw = user.password
      bcrypt
        .compare(password, hashedPw)
        .then((result) => {
          if (result) {
            // Issue JWT token
            const aTokenObj = issueJwt(user)
            return res.status(200).send({ success: true, ...aTokenObj })
          } else {
            return res.status(401).send({ success: false, msg: 'Wrong password' })
          }
        })
        .catch((err) => {
          console.log(err)
          return res.sendStatus(500)
        })
    })
    .catch((err) => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.jwtAuth = jwtAuth
