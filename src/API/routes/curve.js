var express = require('express');
var router = express.Router();

var Grade = require('../models/Grade');
var Class = require('../models/Class');
var Professor = require('../models/Professor');

// Adding grade to mongo
const curve = async (req, res) => {
    console.log("Adding a grade for ", req.body.title);

    // Check if the professor exist. If exist tell user to add
    // the new professor
    let regexClass = new RegExp('^' + req.body.title + '$', "i");

    // change all grades to 100 in grade database
    const updateGrade =  Grade.updateMany({ "class": regexClass },
        { $set: { grade: 100 } },
        function (err, found) {
            if (err) {
                return console.log("Error in finding class", err);
            } else {
                console.log("You update the class: ", found);
            };
        });

    // Check if class exist
    console.log("looking for a class: ", req.body.title);

    const classExist = await Class.findOne({ "title": regexClass }, function (err, result) {
        if (err) {
            return console.log("Error in getting class", err);
        } else {
            console.log("Here is a class: ", result);
        };
    });

    // If class doesn't exist, error
    if (!classExist) {
        console.log("Class doesn't exist");

         return res.status(400).json({ error: "Class doesn't exist. Please add the class using addGrade." })
    } else {
        // get the number of grades for the class
        console.log("Class does exist");

        var gradesLen = classExist.grades.length;
        var curvedGrades = [];
        for (var i = 0; i < gradesLen; i++)
            curvedGrades.push(100);
        console.log("grades: ", curvedGrades);
        const updateClass =  Class.updateMany({ "title": regexClass },
            { $set: { grades: curvedGrades } },
            function (err, found) {
                if (err) {
                    return console.log("Error in finding class", err);
                } else {
                    console.log("You update the class: ", found);
                };
            });
        return res.status(200).json("You curved the class ");
    };

};

router.post('/', curve);

module.exports = router;
