/**
 * Custom JWT verfication instead of using Passport JWT strategy
 */
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = require('../config/keys').JWT_SECRET_KEY

const verifyJwt = (req, res, next) => {
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
    res.status('401').send({ msg: 'You are now authorized' })
  }
}

module.exports.verifyJwt = verifyJwt
