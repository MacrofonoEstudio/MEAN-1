var express = require('express');
var router = express.Router();
var User  = require('../models/fideliausers');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// Configuración de nodemailer
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'direccion@macrofono.es',
        pass: 'xielasm..'
    }
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {titulin: "titulín"});
});

router.post('/users', function(req, res) {

	var user = new User();		// create a new instance of the model
	user.name = req.body.name;  // set the name (comes from the request)
	user.surname = req.body.surname;

	user.save(function(err) {
		if (err)
			res.send(err);

		res.render('index');
	});

});


router.get('/users', function(req, res) {

	User.find(function(err, users) {
		if (err)
			res.send(err);

		res.json(users);
	});

});


//PASSPORT Facebook

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] })); // In Scope we include the Extended Permissions (Out of the general profile (Name...)) we want to use from FB

router.get('/auth/facebook/logged', passport.authenticate('facebook', { successRedirect: '/logged', failureRedirect: '/login'}));

// Passport Local user/pw
router.post('/login',
	passport.authenticate('local', { successRedirect: '', failureRedirect: '/login2' }),
	function(req, res){ // When visiting this route first Passport tries to authentificate the user, if ok it proceeds to the next function

	res.render('index', {usuario: req.user.name});

});


router.get('/logged', function(req, res) {

	res.render('index');

});


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// Routes for mailing

router.post('/email', function(req, res) {

	var message = {

		from: 'direccion@macrofono.es',
		to: req.body.email,
		subject: 'Holita',
		text: req.body.message + '<a href="https://fideliapp1.herokuapp.com/id/'+ req.body.email +'">Clic aquí para confirmar tu email</a>'

	};
	
	transporter.sendMail(message, function(error, info) {

	    if (error) {
	        console.log('Error occurred');
	        console.log(error.message);
	        return;

	    }

	    console.log('Message sent successfully!');
	    console.log('Server responded with "%s"', info.response);

	});

	res.render('index');

});


// Routes for verify mailing
router.post('/register', function(req, res){

	var user = new User({
		provider: 'email',
		provider_id	: null,
		name : req.body.name,
		photo : '',
		gender : null,
		email : req.body.email,
		password: req.body.password,
		verify: false
	});

	//...y lo almacena en la base de datos
	user.save(function(err) {
		if(err) throw err;
		done(null, user);
	});

});


module.exports = router;
