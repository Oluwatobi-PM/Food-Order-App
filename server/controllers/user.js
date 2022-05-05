const User = require('../models/user')
const{sendWelcomeEmail, sendGoodbyeEmail} = require('../emails/account')

exports.users_createuser = async (req,res) => {
    const user = new User(req.body)

    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        token = await user.generateAuthToken()
        res.status(201).send({user, token})

    } catch (e) {
        res.status(400).send("Please ensure that this email has not been used previously on this app and that your password and phone number are valid.")
    }
}

exports.users_getProfile = async (req,res) => {
    res.send(req.user)
}

exports.users_login = async(req,res) => {    
    try{  const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    }catch(e){
        res.status(400).send("Check username or password")

    }
}

exports.users_logout = async(req,res) => {
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

exports.users_logoutAll = async(req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()    
    } catch(e){
        res.status(500).send()
    }
}

exports.users_editProfile = async(req,res) => {
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

}

exports.users_deleteProfile = async(req,res) => {
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

