const express = require('express')
const Order = require('../models/order')
const Menu = require('../models/admin')
const {auth, authRole} = require('../middleware/auth')
const Restaurant = require('../models/admin')
const router = new express.Router()

router.get("/menulist", auth, async (req,res) => {
    
    try{
        const menu = await Restaurant.find()
        if(!menu) {
        return res.status(404).send()
        }
        res.send(menu)
        
    }catch(err){
        res.status(500).send()
    }
})

router.post("/order", auth, async (req,res) => {

    const order = new Order ({
        ...req.body,
        owner: req.user._id,
        name: req.user.name,
        phoneNumber: req.user.phoneNumber
    })
    try{
        await order.save()
        res.status(201).send(order)

    }catch(err){
        res.status(400).send()
    }
})

router.get("/orders", auth, async (req,res) => {
    
    try{
        const orders = await Order.find({owner: req.user._id})
        if(!orders) {
        return res.status(404).send()
        }
        res.send(orders)
        
    }catch(err){
        res.status(500).send()
    }
})

router.get("/order/:id", auth, async (req,res) => {
    try{
        const order = await Order.findOne({_id: req.params.id, owner: req.user._id})
        if(!order) {
            return res.status(404).send()
        }
        res.send(order)
    }catch(err){
        res.status(500).send()
    }
 })

router.patch('/orders/:id', auth, async(req,res) => {
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
})

router.delete('/orders/:id', auth, async(req,res) => {
    try {
        const order = await Order.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!order){
            return res.status(400).send()
        }
        res.send(order)
    } catch(err){
        res.status(400).send(e)
    }
})

module.exports = router