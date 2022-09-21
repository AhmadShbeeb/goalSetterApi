require('dotenv').config()
require('colors')
const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 5000
connectDB()
const app = express()
app.use(cors())

app.use(express.json()) // attach any json data to the "req" object (converts request body to json) for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded from the form post and attach it to req.body

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// serve frontend
if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started at port ${port}`))

module.exports = app
