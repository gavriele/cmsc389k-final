var mongoose = require('mongoose');
var Grade = require('../models/Grade');

mongoose.Promise = global.Promise;

var classSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    grades: {
        type: [Number],
        required: true
    }
});

var Class = mongoose.model("Class", classSchema);
module.exports = Class;