const express = require('express')
const {auth} = require('../middleware/auth')
const OrdersController = require('../controllers/orders')
const router = new express.Router()

router.get("/menulist", auth, OrdersController.orders_getmenu)

router.post("/order", auth, OrdersController.orders_placeorder )

router.get("/orders", auth, OrdersController.orders_orderhistory)

router.get("/order/:id", auth, OrdersController.orders_getorder)

router.patch('/orders/:id', auth, OrdersController.orders_editorder)

router.delete('/orders/:id', auth, OrdersController.orders_deleteorder)

module.exports = router