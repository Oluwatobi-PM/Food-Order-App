const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const orderRouter = require('./router/order')
const adminRouter = require('./router/admin')

const app = express()


app.use(express.json())
app.use(adminRouter)
app.use(userRouter)
app.use(orderRouter)


module.exports = app
