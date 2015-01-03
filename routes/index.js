var express = require('express');
var router = express.Router();
var User  = require('../models/fideliausers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/users', function(req, res) {

	var user = new User();		// create a new instance of the Bear model
	user.name = req.body.name;  // set the bears name (comes from the request)
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

module.exports = router;
