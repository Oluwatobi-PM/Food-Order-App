const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    restaurant: {
        type: String,
        unique: true
    },
    food: {
        type: Array,
        default: []
    },
    drink: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})


const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant