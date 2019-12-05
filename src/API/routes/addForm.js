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
            reviews: req.body.reviews,
            description: req.body.description
        });
        professor.save(function (err) {
            if (err) throw err;
            //return res.status(200).json({ success: 'Successfully insert professor' });
        });


        // Check if class exist
        let regexClass = new RegExp('^' + req.body.classes + '$', "i");
        console.log("looking for a class: ", req.body.classes);

        const classExist = await Class.findOne({ "title": regexClass }, function (err, result) {
            if (err) {
                return console.log("Error in getting class", err);
            } else {
                console.log("Here is a class: ", result);
            };
        });

        // If class doesn't exist, create a new class
        if (!classExist) {
            console.log("Class doesn't exist. Sending ", req.body.classes[0]);

            var newClass = new Class({
                title: req.body.classes[0],
                professor: req.body.name,
               // grades: 0
            });
            newClass.save(function (err) {
                if (err) return res.status(400).json({ error: "New class creation fail!!!", err });
                return res.status(200).json({ success: 'Successfully insert professor' });
            });
        }
    } else {
        return res.status(400).json({ error: 'Professor already exist you moron!' });
    }
};

router.post('/', addForm);

module.exports = router;
