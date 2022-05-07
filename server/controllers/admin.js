const Restaurant = require('../models/admin')
const Order = require('../models/order')
const XLSX = require ('xlsx')
const path = require('path')

exports.admin_createmenu = async (req,res) => {

    const restaurant = new Restaurant ({
        ...req.body,
        creatorID: req.user._id,
        creatorName: req.user.name
    })
    if(!restaurant.restaurant){
    return res.status(400).send("Please enter restaurant name")}
    try{
        await restaurant.save()
        res.status(201).send(restaurant)
    }catch(err){
            res.status(400).send(`Opps. It seems like ${req.body.restaurant} is already on the system. Please use the Update Menu tab instead`)
    }
}

exports.admin_placeorders = async (req,res) => {
    try{
        const order = await Order.findOne({_id: req.params.id})
        if(!order) {
            return res.status(404).send()
        }
        order.orderStatus="Placed"
        await order.save()
        res.send(order)
    }catch(err){
        res.status(500).send()
    }
}

exports.admin_confirmpayment = async (req,res) => {
    try{
        const order = await Order.findOne({_id: req.params.id})
        if(!order) {
            return res.status(404).send()
        }
        order.adminPaymentStatus=true
        await order.save()
        res.send(order)
    }catch(err){
        res.status(500).send()
    }
}

exports.admin_getallorders = async (req,res) => {
    try{
        const order = await Order.find()
        if(!order) {
            return res.status(404).send()
        }
        res.send(order)
    }catch(err){
        res.status(500).send()
    }
 }

 exports.admin_updatemenu = async(req,res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ["food","drink"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{
        const menu = await Restaurant.findOne({_id: req.params.id})
        
        if(!menu) {
            return res.status(404).send({error:"This is not on the Menu"})
        }

        updates.forEach((update) => menu[update] = req.body[update])
        await menu.save()
        
        res.send(menu)
    } catch(err){
        res.status(400).send()
    }
}

exports.admin_deletemenu = async(req,res) => {
    try {
        const menu = await Restaurant.findOneAndDelete({_id: req.params.id})
        if(!menu){
            return res.status(400).send()
        }
        res.send(menu)
    } catch(err){
        res.status(400).send(e)
    }
}

exports.admin_exportdata = async(req,res) => {
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
}
    