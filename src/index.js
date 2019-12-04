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
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
var addGradeSocket = require('./API/routes/addGradeSocket');
var curve = require('./API/routes/curve');
var addForm = require('./API/routes/addForm');
var getClass = require('./API/routes/getClass');
var nuke = require('./API/routes/nuke');

// Get Routes
app.use("/api/grades", getAllGrades);
app.use("/api/professors", getAllProfessor);
app.get("/api/professor/:name", (req, res) => { getProfessor(req, res) });
app.get("/api/:name/grades", (req, res) => { getGradesFromProf(req, res) });
app.get("/api/class/:title", (req, res) => { getClass(req, res) });

// Post Routes
app.use("/api/post/grade", addGrade);
app.use("/api/post/curve", curve);
app.use("/api/post/form", addForm);

//Delete Routes 
app.delete("/api/fire/:name", (req, res) => { fireProfessor(req, res) });
app.use("/api/nuke", nuke);

// Functions to get to specific page
var getHomePage = require('./Pages/home');
var getProfessorPage = require('./Pages/professor');
var getClassPage = require('./Pages/class');
// Pages
// Must fetch a GET/POST/DELETE request from /api/... in order to retrieve the proper json response.
// Then render the specific page with the json response.
app.get("/", (req, res) => { getHomePage(req, res) });
app.get("/form", (req, res) => { res.render('form') });   // probably should rename the create handlebar 
app.get('/professor/:name', (req, res) => { getProfessorPage(req, res) });
app.get("/class/:title", (req, res) => { getClassPage(req, res) });

//socket post
io.on('connection', function(socket) {
    console.log('NEW connection');

    socket.on('new grade', function(msg) {
        console.log("Client submitted new grade: " + JSON.stringify(msg));
        if(addGradeSocket(msg)){
        	console.log("sending succ msg...");
        	io.emit('grade added', "" + msg.review.author + " successfully added a grade to " + msg.class);
        } else {
        	console.log("sending fail msg...");
        	io.emit('grade added', "" + msg.review.author + "failed to add a grade to " + msg.class);
        }
    })
    
    socket.on('disconnect', function() {
        console.log('User has disconnected');
    });
});

// Start listening on port PORT
http.listen(PORT, function () {
    console.log('Server listening on port:', PORT);
});
