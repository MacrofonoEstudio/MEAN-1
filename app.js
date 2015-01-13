var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var port     = process.env.PORT || 3000; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_app32758175:5nitvt7p9n49k6kuto374c55mn@ds029051.mongolab.com:29051/heroku_app32758175', function(err, res) {
  if(err) throw err;
  console.log('Conectado con éxito a la BBDD');
}); // connect to our database

// Login system with passport js
var passport = require('passport');
var expressSession = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use("/public/javascripts", express.static(__dirname + '/public/javascripts'));
app.use("/public/images", express.static(__dirname + '/public/images'));
app.use("/public/css", express.static(__dirname + '/public/css'));

app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Set up Passport
app.use(expressSession({
    secret: 'MacroIslanders',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);


// Initialize Passport
var initPassport = require('./public/javascripts/passport-init');
initPassport(passport);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



app.listen(app.get('port'), function() {
  console.log("Node app is running at port:" + app.get('port'));
});

/* app.listen(3000);
console.log("Node app is running at port:" + app.get('port')); */

module.exports = app;