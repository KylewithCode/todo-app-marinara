// JavaScript Document
const express = require('express');
const app = express();
const mysql = require('mysql');
const passport   = require('passport')
const session    = require('express-session')
const bodyParser = require('body-parser')
const env        = require('dotenv').load()
const todoController = require('./controllers/todoController');
const myDatabase = require('./db');
const flash = require("connect-flash");+

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//setting template engine
var models = require("./models");
app.use(flash());
// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.set('view engine', 'ejs');

//static file management
app.use(express.static('./public'));

//load passport strategies
require('./config/passport/passport.js')(passport,models.user);

//linking files

todoController(app, myDatabase(mysql), passport);
models.sequelize.sync().then(function(){
console.log('Nice! Database looks fine')

}).catch(function(err){
console.log(err,"Something went wrong with the Database Update!")
});

//listening
app.listen(3000);
console.log('You are listening to port 3000');
