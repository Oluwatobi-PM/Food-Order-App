const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const orderRouter = require('./router/order')

const app = express()


app.use(express.json())
app.use(userRouter)
// app.use(orderRouter)


module.exports = app
