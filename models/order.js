const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    restaurant: {
        type: String,
        trim: true,
        required: true
    },
    food: {
        type: String,
        default: ""
    },
    drink: {
        type: String,
        default: ""
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    payment_status: {
        type: String,
        default: false,
    }

}, {
    timestamps: true
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order