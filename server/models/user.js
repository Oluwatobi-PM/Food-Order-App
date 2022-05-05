const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Order = require('./order')


// Create User model
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email must be provided")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
             if(value.toLowerCase().includes('password')) {
                throw new Error("Invalid password")
            }
        }
    },
    phoneNumber:{
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value,'en-NG')){
                throw new Error ("Please provide a valid number")
            }
        }

    },
    role: {
        type: String,
        enum : ["Admin", "User"],
        default: "User"
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]}
    ,{
    timestamps: true
})

//Link order model to user model
userSchema.virtual('orders',{
    ref: 'Order',
    localField:'_id',
    foreignField: 'owner'
})

//find user in the database.
userSchema.statics.findByCredentials = async(email,password) => {
    const user = await User.findOne({email})
    if (!user){
        throw new Error ('Unable to login')
    }
    if(password !== user.password){
        throw new Error ('Unable to login')
    }
    return user
}

//generate authorization token at login or sign up

userSchema.methods.generateAuthToken= async function () {
    const user = this
    const token = jwt.sign({_id: user.id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


//Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Order.deleteMany({owner: user._id})
    next()
})


//define the information to be sent back to a user from the server
userSchema.methods.toJSON = function() {
    const user= this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}


const User = mongoose.model('User', userSchema)


module.exports = User