var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Grade = require('../models/Grade');
var Professor = require('../models/Professor');
var Class = require('../models/Class');

const nuke = async (req, res) => {
    // Drop the Grade Collection
    Grade.deleteMany({}, function (err) {
        if (err) return res.status(400).json({ error: "Nuke grade error." })
    });
    Class.updateMany({"$set": {"grades": []}}, function (err) {
        if (err) return res.status(400).json({ error: "Nuke grade error." })
    });
};

router.delete('/', nuke);

module.exports = router;