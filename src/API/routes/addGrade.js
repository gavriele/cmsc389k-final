var express = require('express');
var router = express.Router();

var Grade = require('../models/Grade');

// Adding grade to mongo
const addGrade = async (req, res) => {
    console.log("Adding a grade for ", req.body.grade);

    // Create new grade
    var grade = new Grade({
        grade: parseInt(req.body.grade),
        comment: req.body.comment,
        class: req.body.class,
        professor: req.body.professor
    });

    // Save grade to database
    grade.save(function (err) {
        if (err) throw err;
        return res.send('Succesfully inserted grade.');
    });
};

router.post("/", addGrade);

module.exports = router;
