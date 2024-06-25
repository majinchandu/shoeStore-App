const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({ //intiallising the schema of the users table
    pic1: {
        type: String,
        required: true
    },
    pic2: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    category: {
        type: String
    },
    Quantity: {
        type: Number
    },
    Description: {
        type: String
    },
    Title:{
        type:String
    }
})

module.exports = mongoose.model("Products", ProductSchema)// matlab users table ke an