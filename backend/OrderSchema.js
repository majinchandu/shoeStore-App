const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    productIds: {
        type: Map,
        of: Number,
     
    },
    Date:{
        type:Date
    }
});

module.exports = mongoose.model('Order', OrderSchema);
