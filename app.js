const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const orderRouter = require('./router/order')
const adminRouter = require('./router/admin')
const cors = require('cors')
const path = require('path')


const app = express()


app.use(express.static(__dirname+'/public'))

app.use(cors({origin: '*'}))
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json())
app.use(adminRouter)
app.use(userRouter)
app.use(orderRouter)


module.exports = app
