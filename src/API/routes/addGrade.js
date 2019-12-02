var express = require('express');
var router = express.Router();

var Grade = require('../models/Grade');
var Class = require('../models/Class');
var Professor = require('../models/Professor');

// Adding grade to mongo
const addGrade = async (req, res) => {
    console.log("Adding a grade for ", req.body.class);
    console.log("With a grade: ", req.body.grade);

    // Check if the professor exist. If exist tell user to add
    // the new professor
    let regexProf = new RegExp('^' + req.body.professor + '$', "i");

    const profExist = await Professor.findOne({ "name": regexProf }, function (err, result) {
        if (err) {
            return console.log("Error in getting professor", err);
        } else {
            console.log("Here is a professor: ", result);
        };
    });
    if (profExist) {
        console.log("Professor exist.");
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
            //res.send('Succesfully inserted grade.');
        });
    } else {
        console.log("Professor doesn't exist.");
        return res.status(400).json({ error: "Professor doesn't exist. Please add the professor in form." })
    }

    // Check if class exist
    let regexClass = new RegExp('^' + req.body.class + '$', "i");
    console.log("looking for a class: ", req.body.class);

    const classExist = await Class.findOne({ "title": regexClass }, function (err, result) {
        if (err) {
            return console.log("Error in getting class", err);
        } else {
            console.log("Here is a class: ", result);
        };
    });

    // If class doesn't exist, create a new class
    if (!classExist) {
        console.log("Class doesn't exist");

        var newClass = new Class({
            title: req.body.class,
            professor: req.body.professor,
            grades: parseInt(req.body.grade)
        });
        newClass.save(function (err) {
            if (err) throw err;
            return res.send('Create a new class');
        });
    } else {
        // Add the new grade into the class
        console.log("Class does exist");
        const updateClass =  Class.update({ "title": regexClass },
            { $push: { grades: req.body.grade } },
            function (err, found) {
                if (err) {
                    return console.log("Error in finding class", err);
                } else {
                    console.log("You update the class: ", found);
                };
            });
        return res.status(200).json("You update the class ");
    };

};

router.post('/', addGrade);

module.exports = router;
