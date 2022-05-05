
const express = require('express')
const {auth, authRole} = require('../middleware/auth')
const AdminController = require('../controllers/admin')
const router = new express.Router()


router.post("/addrestaurant", auth, authRole, AdminController.admin_createmenu)

router.patch("/placeorder/:id", auth, authRole, AdminController.admin_placeorders)

router.patch("/confirmpayment/:id", auth, authRole, AdminController.admin_confirmpayment)

router.get("/allorders", auth, authRole, AdminController.admin_getallorders)

router.patch('/updatemenu/:id', auth, authRole, AdminController.admin_updatemenu)

router.delete('/menu/:id', auth, authRole, AdminController.admin_deletemenu)

module.exports = router