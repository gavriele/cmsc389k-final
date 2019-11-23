var mongoose = require('mongoose');
mongoose.Promise=global.Promise;


var gradeSchema = new mongoose.Schema({
    grade: {
        type: Number,
        min: 0.0,
        max: 100.0,
        required: true
    },
    comment: {
        type: String
    },
    class: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    }
});

var Grade = mongoose.model("Grade", gradeSchema);
module.exports = Grade;
