var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var { mongoConnect } = require("./mongo/mongo");

// Import routes
var getAllGrades = require("./routes/GetAllGrades");

// Connect to MongoDB
mongoConnect();

// Setup Express App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route middleware
app.use("/api/grades", getAllGrades);

// Liston on port 3000
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
