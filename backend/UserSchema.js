const mongoose = require('mongoose')
const { type } = require('os')


const UserSchema = new mongoose.Schema({ //intiallising the schema of the users table
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Address:{
        type:String
    },
    Country:{
        type:String
    },
    Pincode:{
        type:Number
    },
    City:{
        type:String
    },
    Phone:{
        type:Number
    }
})

module.exports = mongoose.model("User",UserSchema)