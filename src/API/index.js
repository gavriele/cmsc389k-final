var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var { mongoConnect } = require("./mongo/mongo");

// Import routes
var getAllGrades = require('./routes/getAllGrades');
var getAllProfessor = require("./routes/getAllProfessor");
var getProfessor = require('./routes/getProfessor');
var getGradesFromProf = require('./routes/getGradesFromProf');
var fireProfessor = require('./routes/fireProfessor');
var addGrade = require('./routes/addGrade');
var addForm = require('./routes/addForm');
require("dotenv").config();

// Connect to MongoDB
mongoConnect();

// Setup Express App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route middleware
app.use("/grades", getAllGrades);
app.use("/professors", getAllProfessor);
app.get("/professor/:name", (req, res) => { getProfessor(req, res) });
app.get("/:name/grades", (req, res) => { getGradesFromProf(req, res) });

// Post Routes
app.use("/post/grade", addGrade);
app.use("/post/form", addForm);

//Delete Routes
app.delete("/fire/:name", (req, res) => { fireProfessor(req, res) });

// Liston on port 3000
/*
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
*/