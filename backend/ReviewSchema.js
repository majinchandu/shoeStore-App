const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  Comment:{
    type:String
  },
  Date:{
    type:Date
  },
  Star:{
    type:Number
  }
  // other review-related fields
});

// const Review = mongoose.model('Review', ReviewSchema);

// module.exports = Review;
module.exports = mongoose.model("Reviews", ReviewSchema)// matlab users table ke an