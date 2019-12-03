var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var dataUtil = require("./data-util");
var _ = require("underscore");
var logger = require('morgan');
var exphbs = require('express-handlebars');
var handlebars = exphbs.handlebars;
var moment = require('moment');
var marked = require('marked');
var app = express();
var PORT = 3000;
var request = require('request');
var bigTags = ["Fastest", "Intel i9", 'Intel i7', 'Intel i5', 'Ryzen 9', 'Ryzen 7', 'Ryzen 5', 'Other'];
var fetch = require("node-fetch");
var { mongoConnect } = require('./API/mongo/mongo');

/// MIDDLEWARE 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

// Connect to MongoDB
mongoConnect();

// Import routes
var getAllGrades = require('./API/routes/getAllGrades');
var getAllProfessor = require("./API/routes/getAllProfessor");
var getProfessor = require('./API/routes/getProfessor');
var getGradesFromProf = require('./API/routes/getGradesFromProf');
var fireProfessor = require('./API/routes/fireProfessor');
var addGrade = require('./API/routes/addGrade');
var addForm = require('./API/routes/addForm');

// Get Routes
app.use("/api/grades", getAllGrades);
app.use("/api/professors", getAllProfessor);
app.get("/api/professor/:name", (req, res) => { getProfessor(req, res) });
app.get("/api/:name/grades", (req, res) => { getGradesFromProf(req, res) });

// Post Routes
app.use("/api/post/grade", addGrade);
app.use("/api/post/form", addForm);

//Delete Routes
app.delete("/api/fire/:name", (req, res) => { fireProfessor(req, res) });

// Functions to get to specific page
var getHomePage = require('./Pages/home');

// Pages
app.get("/", (req, res) => { getHomePage(req, res) });
app.get("/form", (req, res) => { res.render('create') });   // probably should rename the create handlebar 

// Start listening on port PORT
app.listen(PORT, function () {
    console.log('Server listening on port:', PORT);
});

