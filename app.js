const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()

// Setup MongoDB
require('./services/mongoDb')

app.get('/', (req, res) => {
  res.send('❤')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`The app is running on PORT: ${PORT}`)
})
