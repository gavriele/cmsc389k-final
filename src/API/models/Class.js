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
    students: {
        type: Number,
        required: true
    },
    grades: {
        type: [Grade],
        required: true
    }
});

var Class = mongoose.model("Class", classSchema);
module.exports = Class;