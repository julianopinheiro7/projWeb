/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

const morgan = require('morgan');

//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser=require("body-parser");
var expressValidator = require('express-validator');
var consign = require('consign');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'abc123',
    database : 'projweb'
});
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    //,cookie: { maxAge: 160000 }
  }))
 
// development only
 
app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile', user.profile);//to render users profile

//Middleware
app.listen(8080, () => {
  console.log('Servidor On-line na porta 8080.');
});

//consign scan a routes e inclui no app
consign()
	.include('routes')
	.include('app/controllers')
	.then('app/models')
	.into(app);

module.exports = app;