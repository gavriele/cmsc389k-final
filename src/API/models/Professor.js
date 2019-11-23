var mongoose =  require('mongoose');
var review =  require('../models/Review');

mongoose.Promise = global.Promise;

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
        type: [review]
    }
});

var Professor = mongoose.model("Professor", professorSchema);
module.exports = Professor;