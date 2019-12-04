var express = require('express');
var Grade = require('../models/Grade');
var Class = require('../models/Class');
var Professor = require('../models/Professor');

// Adding grade to mongo
async function addGradeSocket(new_grade) {
    console.log("Adding a grade for ", JSON.stringify(new_grade));

    // Check if the professor exist. If exist tell user to add
    // the new professor
    let regexProf = new RegExp('^' + new_grade.professor + '$', "i");
    const profExist = await Professor.findOne({ "name": regexProf }, function (err, result) {
        if (err) {
                console.log("Professor doesn't exist you moron!");
            return false;
        }
    });
    if (profExist) {
        console.log("Professor exist.");
        // Create new grade
        var grade = new Grade({
            grade: parseInt(new_grade.grade),
            review: new_grade.review,
            class: new_grade.class,
            professor: new_grade.professor
        });

        // Save grade to database
        grade.save(function (err) {
            if (err) {
                console.log("err in saving,", err);
                return false;
            }
            console.log("save the grade model to database");
        });

        const updateProfessorReviews = Professor.updateOne({ "name": regexProf },
            { $push: { reviews: new_grade.review } },
            function (err, found) {
                if (err) {
                    console.log("err finding prof:", err)
                    return false;
                } else {
                    console.log("You update the professor reviews");
                };
            });

    } else {
        console.log("Professor doesn't exist.");
        return false;
    };
    // Check if class exist
    let regexClass = new RegExp('^' + new_grade.class + '$', "i");
    console.log("looking for a class: ", new_grade.class);

    const classExist = await Class.findOne({ "title": regexClass }, function (err, result) {
        if (err) {
            console.log("Error in getting class", err);
            return false;
        } else {
            console.log("Here is a class: ", result);
        };
    });

    // If class doesn't exist, create a new class
    if (!classExist) {
        console.log("Class doesn't exist");
        return false;
    } else {
        // Add the new grade into the class
        console.log("Class does exist");
        const updateClass = Class.updateOne({ "title": regexClass },
            { $push: { grades: new_grade.grade } },
            function (err, found) {
                if (err) {
                    console.log("err pushing grade to class:", err)
                    return false;
                } else {
                    console.log("You update the class");
                };
            });
        console.log("New grade added to class.");
        return true;
    };
};

module.exports = addGradeSocket;
