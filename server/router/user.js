const express = require('express')
const {auth} = require('../middleware/auth')
const UserController = require('../controllers/user')
const router = new express.Router()

router.post("/users", UserController.users_createuser)

router.get("/users/me", auth, UserController.users_getProfile)

router.post('/users/login', UserController.users_login)

router.post('/users/logout',auth, async(req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()

    } catch(e){
        res.status(500).send()
    }
}
)

router.post('/users/logoutAll',auth, async(req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()    
    } catch(e){
        res.status(500).send()
    }
} )

router.patch('/users/me', auth , async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/users/me', auth, async(req,res) => {
    try {
        const user = await req.user.remove()
        sendGoodbyeEmail(user.email,user.name)

        if(!user){
            return res.status(400).send()
        }
        res.send(req.user)
    } catch(e){
        res.status(400).send(e)
    }
}
)

module.exports = router