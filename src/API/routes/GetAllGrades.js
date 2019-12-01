var express = require('express');
var router = express.Router();

var Grade = require('../models/Grade');

const getAllGrades = async (req, res) => {

    console.log("Getting all the grades.");
    const grades = await Grade.find({}, function (err, grade) {
        if (err) {
            console.log("error in getting grades", err);
        } else {
            console.log("Here is one of the grades.", grade);
        };
    });
    return res.status(200).json({ grades });
};

router.get('/', getAllGrades);

module.exports = router;
