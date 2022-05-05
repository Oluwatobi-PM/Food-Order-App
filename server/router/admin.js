const express = require('express')
const {auth, authRole} = require('../middleware/auth')
const AdminController = require('../controllers/admin')
const router = new express.Router()
const XLSX = require ('xlsx')
const path = require('path')
const Order = require('../models/order')


router.post("/addrestaurant", auth, authRole, AdminController.admin_createmenu)

router.patch("/placeorder/:id", auth, authRole, AdminController.admin_placeorders)

router.patch("/confirmpayment/:id", auth, authRole, AdminController.admin_confirmpayment)

router.get("/allorders", auth, authRole, AdminController.admin_getallorders)

router.patch('/updatemenu/:id', auth, authRole, AdminController.admin_updatemenu)

router.delete('/menu/:id', auth, authRole, AdminController.admin_deletemenu)


router.post('/orders/exportdata', auth, authRole, async(req,res) => {
    try{
        var workbook = XLSX.utils.book_new(); //new workbook
        Order.find((err,data) => {
            if (err) {
                console.log(err)
            }else {
                var orders=JSON.stringify(data);
                orders = JSON.parse(orders);
                var worksheet = XLSX.utils.json_to_sheet(orders)
                var download = __dirname+"\public\exportdata.xlsx"
                XLSX.utils.book_append_sheet(workbook,worksheet,"sheet1")
                XLSX.writeFile(workbook,download)
                res.download(download)
            }
        })
    
    } catch (e){ 
        res.status(500).send(e)
        
    }
    })
    

module.exports = router