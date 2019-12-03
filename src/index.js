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
var PORT = 8000;
var request = require('request');
var bigTags = ["Fastest", "Intel i9", 'Intel i7', 'Intel i5', 'Ryzen 9', 'Ryzen 7', 'Ryzen 5', 'Other'];
const fetch = require("node-fetch");

dataUtil.restoreOriginalData();
var _DATA = dataUtil.loadData().blog_posts;



/// MIDDLEWARE 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

var server = require('./API/index');

app.get("/",  async (req, res) => {


    //changing tags to be the default tags
    //var tags = dataUtil.getAllTags(_DATA);

console.log("in / function >>>>>>>>>>>>>>>>>>>")
/*
    let resp;
    var options = {
        method: 'GET',
        url: 'http://localhost:3000/professors',
        headers: {
            "Content-Type": "application/json"
        },
    }
     request(options, function (error, res, body) {
        if (error) throw new Error(error);
        resp = JSON.parse(res.body);
        console.log(">>>>>>>>>resp ", JSON.parse(res.body));

    });

console.log("resp +++++++++++++++++", resp)
*/
   
    const resp = await fetch('http://localhost:3000/professors', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
   // json = await resp.json();
    
    console.log(">>>>>>>>>>>>>>>>>>", resp);
    res.render('home', {
        data: _DATA,
        //tags: tags,
        //bigTags: bigTags,
    });

});

/*
var body = req.body;
    var options = {
        method: 'POST',
        url: 'http://localhost:8000/api/create/',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            title: "Test Title",
            slug: 'Test Slug',
            tags: ['test1','test2','test3'],
            multiplier: "36",
            bclk: "100",
            uncore: 43,
            ramspeed: "2133",
            vcore: "1.25",
            vccio: "1.0",
            vccsa: "1.0",
            vddr: "1.35",
            price: "300",
            r15: "1600",
            preview: "Test Preview",
            content: "Test Content",
        }
    };

    request(options, function (error, res, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
    // Add time

    body.time = moment().format('MMMM Do YYYY, h:mm a');

    // Save new blog post
    _DATA.push(req.body);
    dataUtil.saveData(_DATA);
    //res.redirect("/");
    */
/*
app.get("/api/all", function(req, res) {
    //res.render('home');
    res.json(_DATA);
});

app.get("/create", function(req, res) {
    res.render('create');
});

app.post('/create', function(req, res) {
    var body = req.body;
    var storage = []
    // Transform tags and content, filter out empty values
    console.log(body.tags);
    body.tags = body.tags.filter(function (el) {
        return el != "";
    });

    for(tag of body.tags)
        storage.push(...tag.split(" "));

    body.tags=storage;
    body.content = marked(body.content);

    // Add time and preview
    body.preview = body.content.substring(0, 250);
    body.time = moment().format('MMMM Do YYYY, h:mm a');

    // Save new blog post
    _DATA.push(req.body);
    dataUtil.saveData(_DATA);
    res.redirect("/");
});


app.post('/api/create', function(req, res) {
    var body = req.body;
    var options = {
        method: 'POST',
        url: 'http://localhost:8000/api/create/',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            title: "Test Title",
            slug: 'Test Slug',
            tags: ['test1','test2','test3'],
            multiplier: "36",
            bclk: "100",
            uncore: 43,
            ramspeed: "2133",
            vcore: "1.25",
            vccio: "1.0",
            vccsa: "1.0",
            vddr: "1.35",
            price: "300",
            r15: "1600",
            preview: "Test Preview",
            content: "Test Content",
        }
    };

    request(options, function (error, res, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
    // Add time

    body.time = moment().format('MMMM Do YYYY, h:mm a');

    // Save new blog post
    _DATA.push(req.body);
    dataUtil.saveData(_DATA);
    //res.redirect("/");
});


app.get('/post/:slug', function(req, res) {
    var tags = dataUtil.getAllTags(_DATA);
    var bigTags = ["Intel i9",'Intel i7','Intel i5','Intel i3','Ryzen 9','Ryzen 7','Ryzen 5','Other'];
    var _slug = req.params.slug;
    var blog_post = _.findWhere(_DATA, { slug: _slug });
    if (!blog_post)
        return res.render('404');
    res.render('post', {blog_post, tags, bigTags:bigTags});
});

app.get('/tag/:tag', function(req, res) {
    var tags = dataUtil.getAllTags(_DATA);
    var tag = req.params.tag;
    var posts = [];
    _DATA.forEach(function(post) {
        if (post.tags.includes(tag)) {
            posts.push(post);
        }
    });
    res.render('home', {
        tag: tag,
        data: posts,
        tags: tags,
        bigTags: bigTags,
    });
});

//returns the fastest chip we have on record for each category/overall??
app.get('/fastest', function(req, res) {
    var tags = dataUtil.getAllTags(_DATA);
    console.log("testing");
    var fastest = {slug:"",speed:0};
    var bestPerf = {slug:"",score:0};
    _.each(_DATA,function(i){
        var clockspeed = i.multiplier * i.bclk;
        if(fastest.speed < clockspeed) {
            fastest = {slug:i.slug, speed:clockspeed};
        }
        if(bestPerf.score < i.r15){
            bestPerf = {slug: i.slug, score: i.r15};
        }
    })
    if (fastest.speed == 0) return res.render('404');
    var fastestPost = _.findWhere(_DATA,{slug: fastest.slug});
    var bestPost = _.findWhere(_DATA,{slug: bestPerf.slug});

    res.render('fastest', {fastestPost, bestPost, tags, bigTags});
});

//gets the high-end chips
app.get('/high-end', function(req, res) {
    var tags = dataUtil.getAllTags(_DATA);
    var tag = req.params.tag;
    var posts = [];
    _DATA.forEach(function(post) {
        if (post.tags.includes('i9')||post.tags.includes('i7')||post.tags.includes('9')) {
            posts.push(post);
        }
    });
    res.render('home', {
        tag: tag,
        data: posts,
        tags: tags
    });
});

//gets the mid tier chips
app.get('/mid-tier', function(req, res) {
    var tags = dataUtil.getAllTags(_DATA);
    var tag = req.params.tag;
    var posts = [];
    _DATA.forEach(function(post) {
        if (post.tags.includes('i5')||post.tags.includes('7')||post.tags.includes('5')) {
            posts.push(post);
        }
    });
    res.render('home', {
        tag: tag,
        data: posts,
        tags: tags
    });
});

//you get the idea
app.get('/budget', function(req, res) {
    var tags = dataUtil.getAllTags(_DATA);
    var tag = req.params.tag;
    var posts = [];
    _DATA.forEach(function(post) {
        if (post.tags.includes('i3')||post.tags.includes('5')) {
            posts.push(post);
        }
    });
    res.render('home', {
        tag: tag,
        data: posts,
        tags: tags
    });
});
*/
// Start listening on port PORT

app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});

