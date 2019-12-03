var express = require('express');
var router = express.Router();

var Professor = require('../models/Professor');

const getAllProfessor = async (req, res) => {
    console.log("Getting all the professor.");

    const professors = await Professor.find({}, function (err, professor) {
        if (err) {
            console.log("Error in getting professor", err);
            return;
        } else {
            console.log("Here is a professor: ", professor);
        };
    });
    return res.status(200).json({ professors });
};

router.get('/', getAllProfessor);

module.exports = router;