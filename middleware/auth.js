const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token})
        console.log(user)
        
        if (!user) {
            throw new Error()
        }
        
        req.token = token
        req.user = user
        console.log(req.user)
        console.log(req.token)
        next()
    } catch(e){
        res.status(401).send({error:"Please authenticate."})
    }
}

// const authRole = async (req, res, next) => {
//     try{
//         if(req.user.roles[0] !== "Admin") {
//             throw new Error()
//         }
//         next()
//     } catch (e){
//         res.status(401).send({error: "Please request authorized login credentials"})
//     }

// }



module.exports = {auth}