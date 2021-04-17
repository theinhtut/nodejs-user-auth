require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI || '',
  SESSIONS_SECRET: process.env.SESSIONS_SECRET || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || ''
}
