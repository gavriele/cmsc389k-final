var express = require('express');
var router = express.Router();

var Professor = require('../models/Professor');
var Class = require('../models/Class');

const addForm = async (req, res) => {
    console.log("Adding a professor for ", req.body.name);
    console.log("With the weakeness ", req.body.weakness);

    let regexProf = new RegExp('^' + req.body.name + '$', "i");
    const profExist = await Professor.findOne({ "name": regexProf }, function (err, result) {
        if (err) {
            return console.log("Error in getting class", err);
        } else {
            console.log("Prof doesn't exist yet", result);
        };
    });

    if (!profExist) {
        var professor = new Professor({
            name: req.body.name,
            strength: req.body.strength,
            weakness: req.body.weakness,
            classes: req.body.classes,
            reviews: req.body.reviews
        });
        professor.save(function (err) {
            if (err) throw err;
            return res.status(200).json({ success: 'Successfully insert professor' });
        });
    } else {
        return res.status(400).json({ error: 'Professor already exist you moron!' });
    }
};

router.post('/', addForm);

module.exports = router;
