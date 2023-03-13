require('dotenv/config')
require('express-async-errors')

const AppError = require('./utils/apperror')
const express = require('express')
const database = require('./database/sqlite')
const routes = require('./routes/index')
const uploadsConfig = require('./config/upload')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.use('/files', express.static(uploadsConfig.UPLOADS_FOLDER))

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

database()

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
