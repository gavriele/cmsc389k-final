var express = require('express');
var router = express.Router();

var Professor = require('../models/Professor');
var Class = require('../models/Class');

const addForm = async (req, res) => {
    console.log("Adding a professor for ", req.body.name);
    console.log("With the weakeness ", req.body.weakness);
    console.log("With your grade: ", req.body.grade);

    var professor = new Professor({
        name: req.body.name,
        strength: req.body.strength,
        weakness: req.body.weakness,
        classes: req.body.classes,
        reviews: req.body.reviews
    });
    professor.save(function (err) {
        if (err) throw err;
        return res.send('Successfully insert professor');
    });
};

router.post('/', addForm);

module.exports = router;