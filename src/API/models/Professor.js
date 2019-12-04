var mongoose =  require('mongoose');
var reviewSchema = require('./Review');

mongoose.Promise = global.Promise;
/*
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
*/
var professorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    strength: {
        type: [String]
    },
    weakness: {
        type: [String]
    },
    classes: {
        type: [String],
        required: true
    },
    reviews: {
        type: [reviewSchema]
    }

});

var Professor = mongoose.model("Professor", professorSchema);
module.exports = Professor;