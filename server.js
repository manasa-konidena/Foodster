var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');



// var connectionString = 'mongodb://127.0.0.1:27017/assignment5610';
var connectionString = 'mongodb://manasa:manasa@ds113835.mlab.com:13835/foodster';


// if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//         process.env.OPENSHIFT_APP_NAME;
// }

var mongoose = require("mongoose");
mongoose.connect(connectionString);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
//app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(session({ secret: "mannas" }));

app.use(passport.initialize());
app.use(passport.session());



// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/assignment5610');

var port = process.env.PORT || 3000;

// var assignment = require("./assignment/app.js");
// assignment(app);

var project = require("./project/app.js");
project(app);

//app.listen(port, ipaddress);

app.listen(port,() => console.log(`API running on localhost:${port}`));