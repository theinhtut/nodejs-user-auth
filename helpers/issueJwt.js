const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = require('../config/keys').JWT_PRIVATE_KEY

module.exports = (user) => {
  const id = user._id
  const expiresIn = '1d'

  const payload = {
    id,
    iat: Date.now()
  }

  const signedToken = jwt.sign(payload, JWT_PRIVATE_KEY, {
    expiresIn: expiresIn
  })

  return {
    aToken: `Bearer ${signedToken}`,
    iat: payload.iat
  }
}
