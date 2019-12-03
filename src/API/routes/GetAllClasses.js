var express = require('express');
var router = express.Router();

var Class = require('../models/Class');

const getAllClasses = async (req, res) => {
    console.log("Getting all the classes.");

    const classes = await Class.find({}, function (err, my_class) {
        if (err) {
            console.log("Error in getting class", err);
            return;
        } else {
            console.log("Here is a class: ", my_class);
        };
    });
    return res.status(200).json({ classes });
};

router.get('/', getAllClasses);

module.exports = router;