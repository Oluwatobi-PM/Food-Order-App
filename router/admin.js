const express = require('express')
const Order = require('../models/order')
const Restaurant = require('../models/admin')
const {auth, authRole} = require('../middleware/auth')
const router = new express.Router()

// router.post("/users",  async (req,res) => {
//     const user = new User(req.body)

//     try{
//         await user.save()
//         // sendWelcomeEmail(user.email, user.name)
//         token = await user.generateAuthToken()
//         res.status(201).send({user, token})

//     } catch (e) {
//         res.status(400).send("Please check your email or password.")
//     }
// })

router.post("/addrestaurant", auth, authRole, async (req,res) => {

    const restaurant = new Restaurant ({
        ...req.body,
        creatorID: req.user._id,
        creatorName: req.user.name
    })
    try{
        await restaurant.save()
        res.status(201).send(restaurant)

    }catch(err){
        res.status(400).send(`Opps. It seems like ${req.body.name} is already on the system. Please use the Update Menu tab instead`)
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

router.patch("/placeorder/:id", auth, authRole, async (req,res) => {
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
})

router.patch("/confirmpayment/:id", auth, authRole, async (req,res) => {
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
})

router.get("/allorders", auth, authRole, async (req,res) => {
    try{
        const order = await Order.find()
        if(!order) {
            return res.status(404).send()
        }
        res.send(order)
    }catch(err){
        res.status(500).send()
    }
 })

router.patch('/updatemenu/:id', auth, authRole, async(req,res) => {
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
})

router.delete('/menu/:id', auth, authRole, async(req,res) => {
    try {
        const menu = await Restaurant.findOneAndDelete({_id: req.params.id})
        if(!menu){
            return res.status(400).send()
        }
        res.send(menu)
    } catch(err){
        res.status(400).send(e)
    }
})

module.exports = router