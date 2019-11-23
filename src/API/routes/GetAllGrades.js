const express = require('express');
const router = express.Router();

var Grade = require('../models/Grade');

const getAllGrades = async (req, res) => {
    console.log("Getting all the grades.");
    Grade.find({}, function (err, grade) {
        if (err) throw err;
        if(!grade) {
            console.log("Unable to retrieve all grades.")
        };
        res.send("Here is all the grades.");
    });
};

router.get("/", getAllGrades);

module.exports = router;
