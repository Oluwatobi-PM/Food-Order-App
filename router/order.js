// const express = require('express')
// const Order = require('../models/order')
// const auth = require('../middleware/auth')
// const router = new express.Router()

// //save the order entries of a user

// router.post("/order", auth, async (req,res) => {

//     const order = new Order ({
//         ...req.body,
//         owner: req.user._id
//     })
//     try{
//         await order.save()
//         res.status(201).send(order)

//     }catch(err){
//         res.status(400).send()
//     }
// })

// //GET/tasks?completed=true
// //GET /tasks?limit=10&skip=20
// //GET/tasks?sortBy=createdAt_desc


// router.get("/tasks", auth, async (req,res) => {
//     const match = {}
//     const sort = {}

//     if(req.query.completed){
//         match.completed = req.query.completed === 'true'
//     }

//     if(req.query.sortBy){
//         const parts = req.query.sortBy.split(':')
//         sort[parts[0]] = parts[1] === true ? 1 : -1
//     }


//     try{
//         // task = await Task.find({owner: req.user._id})
//         await req.user.populate({ 
//             path: 'tasks',
//             match,
//             options:{
//             limit: parseInt(req.query.limit),
//             skip: parseInt(req.query.skip),
//             sort
//             }
//     }).execPopulate()
//         res.send(req.user.tasks)
//     } catch(err){
//         res.status(500).send()
//     }
// })

// router.get("/task/:id", auth, async (req,res) => {
//     const _id = req.params.id
//     try{
//         const task = await Task.findOne({_id, owner: req.user._id})
//         if(!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     }catch(err){
//         res.status(500).send()
//     }
//  })

// router.patch('/tasks/:id', auth, async(req,res) => {
//     const updates = Object.keys(req.body)
//     console.log(updates)
//     const allowedUpdates = ["completed","description"]
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({error: 'Invalid updates!'})
//     }
//     try{
//         const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        
//         if(!task) {
//             return res.status(404).send({error:"No matching task"})
//         }

//         updates.forEach((update) => task[update] = req.body[update])
//         await task.save()
        
//         res.send(task)
//     } catch(err){
//         res.status(400).send()
//     }

// })

// router.delete('/tasks/:id', auth, async(req,res) => {
//     try {
//         const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
//         if(!task){
//             return res.status(400).send()
//         }
//         res.send(task)
//     } catch(err){
//         res.status(400).send(e)
//     }
// })

// module.exports = router