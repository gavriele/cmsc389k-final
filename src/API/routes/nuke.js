var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Grade = require('../models/Grade');
var Professor = require('../models/Professor');
var Class = require('../models/Class');

const nuke = async (req, res) => {
    // Drop the Grade Collection
    Grade.remove({}, function (err) {
        if (err) return res.status(400).json({ error: "Nuke grade error." })
    });
    Professor.remove({}, function (err) {
        if (err) return res.status(400).json({ error: "Nuke professor error." })
    });
    Class.remove({}, function (err) {
        if (err) return res.status(400).json({ error: "Nuke class error." })
        return res.status(200).json({ success: "Great... you nuke our project." });
    });
};

router.delete('/', nuke);

module.exports = router;