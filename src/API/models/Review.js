var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0.00,
        max: 5.00,
        required: true
    },
    comment: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
});

var Review = mongoose.model("Review", reviewSchema);
module.exports = Review;