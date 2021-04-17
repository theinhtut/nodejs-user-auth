const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = require('../config/keys').JWT_SECRET_KEY

module.exports = (user) => {
  const id = user._id
  const expiresIn = '1d'

  const payload = {
    id,
    iat: Date.now()
  }

  const signedToken = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: expiresIn
  })

  return {
    token: `Bearer ${signedToken}`,
    iat: payload.iat
  }
}
