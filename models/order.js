const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    restaurant: {
        type: String,
        trim: true,
        required: true
    },
    food: {
        type: Array,
        default: []
    },
    drink: {
        type: Array,
        default: []
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    phoneNumber: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["Pending","Placed"],
        default: "Pending"
    },
    userPaymentStatus: {
        type: String,
        default: false,
    },
    adminPaymentStatus: {
        type: String,
        default: false,
    }

}, {
    timestamps: true
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order