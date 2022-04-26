// const express = require('express')
// const Order = require('../models/order')
// const auth = require('../middleware/auth')
// const router = new express.Router()

// router.post("/order", auth, async (req,res) => {

//     const order = new Order ({
//         ...req.body,
//         owner: req.user._id,
//         name: req.user.name
//     })
//     try{
//         await order.save()
//         res.status(201).send(order)

//     }catch(err){
//         res.status(400).send()
//     }
// })

// router.get("/orders", auth, async (req,res) => {
//     const match = {}

//     if(req.query.paid){
//         match.paid = req.query.paid === 'true'
//     }

//     try{
//         await req.user.populate({ 
//             path: 'orders',
//             match,
//             options:{
//             limit: parseInt(req.query.limit),
//             skip: parseInt(req.query.skip),
//             }
//     }).execPopulate()
//         res.send(req.user.orders)
//     } catch(err){
//         res.status(500).send()
//     }
// })

// router.get("/order/:id", auth, async (req,res) => {
//     const _id = req.params.id
//     try{
//         const order = await Order.findOne({_id, owner: req.user._id})
//         if(!task) {
//             return res.status(404).send()
//         }
//         res.send(order)
//     }catch(err){
//         res.status(500).send()
//     }
//  })

// router.patch('/orders/:id', auth, async(req,res) => {
//     const updates = Object.keys(req.body)
//     console.log(updates)
//     const allowedUpdates = ["food","drink","restaurant"]
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({error: 'Invalid updates!'})
//     }
//     try{
//         const order = await Order.findOne({_id: req.params.id, owner: req.user._id})
        
//         if(!order) {
//             return res.status(404).send({error:"No matching order"})
//         }

//         updates.forEach((update) => order[update] = req.body[update])
//         await order.save()
        
//         res.send(order)
//     } catch(err){
//         res.status(400).send()
//     }
// })

// router.delete('/orders/:id', auth, async(req,res) => {
//     try {
//         const order = await Order.findOneAndDelete({_id: req.params.id, owner: req.user._id})
//         if(!order){
//             return res.status(400).send()
//         }
//         res.send(order)
//     } catch(err){
//         res.status(400).send(e)
//     }
// })

// module.exports = router