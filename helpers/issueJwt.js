const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = require('../config/keys').JWT_PRIVATE_KEY

module.exports = (user) => {
  const id = user._id
  const expiresIn = '1d'

  const payload = {
    id,
    iat: Date.now()
  }

  const signedToken = jwt.sign(payload, '123', {
    expiresIn: expiresIn
  })

  return {
    token: `Bearer ${signedToken}`,
    iat: payload.iat
  }
}
