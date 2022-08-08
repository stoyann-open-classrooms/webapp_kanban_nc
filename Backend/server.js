// Dependenties
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middlewares/error')
const connectDB = require('./config/db')



// connect database
connectDB()

// Routes files import
const kanban = require('./routes/kanban')
const request = require('./routes/request')
const order = require('./routes/order')
const product = require('./routes/product')

// Express initialisation
const app = express()

// Body parser
app.use(express.json())

const PORT = process.env.PORT || 5058
const NODE_ENV = process.env.NODE_ENV

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// cors middleware
app.use(
  cors({
    origin: '*',
  }),
)

// Mount routers
app.use('/api/v1/kanbans', kanban)
app.use('/api/v1/requests', request)
app.use('/api/v1/orders', order)
app.use('/api/v1/products', product)

// error handler middlewares
app.use(errorHandler)

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${NODE_ENV} mode on PORT:   http://localhost:${PORT} ========`
      .white.underline.bold.bgGreen,
  ),
)
