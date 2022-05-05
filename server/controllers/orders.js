const Order = require('../models/order')
const Restaurant = require('../models/admin')

exports.orders_getmenu = async (req,res) => {    
    try{
        const menu = await Restaurant.find()
        if(!menu) {
        return res.status(404).send()
        }
        res.send(menu)
        
    }catch(err){
        res.status(500).send()
    }
}

exports.orders_placeorder = async (req,res) => {

    const order = new Order ({
        ...req.body,
        owner: req.user._id,
        name: req.user.name,
        phoneNumber: req.user.phoneNumber
    })
    try{
        await order.generateTotal()
        await order.save()
        res.status(201).send(order)

    }catch(err){
        res.status(400).send()
    }
}

exports.orders_orderhistory = async (req,res) => {
    
    try{
        const orders = await Order.find({owner: req.user._id})
        if(!orders) {
        return res.status(404).send()
        }
        res.send(orders)
        
    }catch(err){
        res.status(500).send()
    }
}

exports.orders_getorder = async (req,res) => {
    try{
        const order = await Order.findOne({_id: req.params.id, owner: req.user._id})
        if(!order) {
            return res.status(404).send()
        }
        res.send(order)
    }catch(err){
        res.status(500).send()
    }
 }

exports.orders_editorder = async(req,res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ["food","drink","restaurant","userPaymentStatus"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{
        const order = await Order.findOne({_id: req.params.id, owner: req.user._id})
        
        if(!order) {
            return res.status(404).send({error:"No matching order"})
        }

        updates.forEach((update) => order[update] = req.body[update])
        await order.save()
        
        res.send(order)
    } catch(err){
        res.status(400).send()
    }
}

exports.orders_deleteorder = async(req,res) => {
    try {
        const order = await Order.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!order){
            return res.status(400).send()
        }
        res.send(order)
    } catch(err){
        res.status(400).send(e)
    }
}