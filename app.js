const express = require('express')
const app = express()

require('dotenv').config()

app.get('/', (req, res) => {
  res.send('❤')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`The app is running on PORT: ${process.env.NODE_ENV}`)
})
