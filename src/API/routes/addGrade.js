var express = require('express');
var router = express.Router();

var Grade = require('../models/Grade');
var Class = require('../models/Class');
var Professor = require('../models/Professor');

// Adding grade to mongo
const addGrade = async (req, res) => {
    console.log("Adding a grade for ", req.body.class);

    // Check if the professor exist. If exist tell user to add
    // the new professor
    let regexProf = new RegExp('^' + req.body.professor + '$', "i");
    const profExist = await Professor.findOne({ "name": regexProf }, function (err, result) {
        if (err) {
            return res.status(400).json({ error: "Professor doesn't exist you moron!" });
        }
    });
    if (profExist) {
        console.log("Professor exist.");
        // Create new grade
        var grade = new Grade({
            grade: parseInt(req.body.grade),
            review: req.body.review,
            class: req.body.class,
            professor: req.body.professor
        });

        // Save grade to database
        grade.save(function (err) {
            if (err) return console.log("err in saving,", err); // return err;//res.status(400).json({ error: "Saving the grade to db fail!" });
            console.log("save the grade model to database")
        });

        // Add the reviews to the professor's review array
        const updateProfessorReviews = Professor.updateOne({ "name": regexProf },
            { $push: { reviews: req.body.review } },
            function (err, found) {
                if (err) {
                    return res.status(400).json({ error: "Error in finding professor" });
                } else {
                    console.log("You update the professor reviews");
                };
            });

        // Add the class to the Professor's classes set
        const updateProfessorClass = Professor.updateOne({ "name": regexProf },
            { $addToSet: { classes: req.body.class } },
            function (err, found) {
                if (err) {
                    return res.status(400).json({ error: "Error in finding professor" });
                } else {
                    console.log("You update the professor classes");
                };
            });
            

    } else {
        console.log("Professor doesn't exist.");
        return res.status(400).json({ error: "Professor doesn't exist. Please add the professor in form." })
    };
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
            if (err) return res.status(400).json({ error: "New class creation fail!" });
            return res.status(200).json({ success: "Saving the grade to db!" });
        });
    } else {
        // Add the new grade into the class
        console.log("Class does exist");
        const updateClass = Class.updateOne({ "title": regexClass },
            { $push: { grades: req.body.grade } },
            function (err, found) {
                if (err) {
                    return res.status(400).json({ error: "Error in finding class" });
                } else {
                    console.log("You update the class");
                };
            });
        return res.status(200).json({ success: "You add the new grade to class " });
    };
};

router.post('/', addGrade);

module.exports = router;
