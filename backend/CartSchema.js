const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    productIds: {
        type: Map,
        of: Number,
        // required: true
    }
});

module.exports = mongoose.model('Cart', CartSchema);
