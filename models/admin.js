const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    restaurant: {
        type: String,
        unique: true,
        required: true
    },
    food: [{Name: String,
        Price: Number}],
    drink: [{Name: String,
        Price: Number}],
}, {
    timestamps: true
})


const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant