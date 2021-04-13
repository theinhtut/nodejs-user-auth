require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI || '',
  SESSIONS_SECRET: process.env.SESSIONS_SECRET || '',
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY || '',
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || ''
}
