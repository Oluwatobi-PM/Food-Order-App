const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token})
        if (!user) {
            throw new Error()
        }
        
        req.token = token
        req.user = user
    
        console.log(req.user.role)
        next()
    } catch(e){
        res.status(401).send({error:"Please authenticate."})
    }
}

const authRole = async (req, res, next) => {
    try{
        if(req.user.role !== "Admin") {
            throw new Error()
        }
        next()
    } catch (e){
        res.status(401).send({error: "Please request Admin credentials"})
    }

}

module.exports = {
    auth,
    authRole}