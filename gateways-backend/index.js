const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')

// It shows information on all the processes running
console.log(process.env)

// Creating an express server
const app = express()

// Database
dbConnection()

// CORS
app.use(cors())

// Public folder
app.use(express.static('public'))

// reading and parsing the body
app.use(express.json())

// Routes
//app.use('/api/auth', require('./routes/auth'))
app.use('/api/gateways', require('./routes/gateways'))

// Listen to requests
app.listen(4000, () => {
	console.log(`Server running on port ${4000}`)
})
