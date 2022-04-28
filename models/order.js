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
    orderTotal: Number,
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

orderSchema.methods.generateTotal= async function () {
    const order = this
    totalDrinkPrice = 0
    totalFoodPrice = 0
    for(i = 0; i < order.food.length; i++){
        unitFoodPrice = order.food[i].Unit * order.food[i].Price
        totalFoodPrice += unitFoodPrice
    }
    for(i = 0; i < order.drink.length; i++){
        unitDrinkPrice = order.drink[i].Unit * order.drink[i].Price
        totalDrinkPrice += unitDrinkPrice
    }
    const orderTotal = totalDrinkPrice + totalFoodPrice
    order.orderTotal = orderTotal
    await order.save()
}

const Order = mongoose.model('Order', orderSchema)

module.exports = Order