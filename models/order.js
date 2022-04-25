const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    restaurant: {
        type: String,
        trim: true,
        required: true
    },
    food: {
        type: String
    },
    drink: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {
    timestamps: true
})



const Order = mongoose.model('Order', orderSchema)

module.exports = Order