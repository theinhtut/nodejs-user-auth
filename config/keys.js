require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || '',
  SESSIONS_SECRET: process.env.SESSIONS_SECRET || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || ''
}
