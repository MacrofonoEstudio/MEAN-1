var express = require('express');
var router = express.Router();
var Users = require('../models/fideliausers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/users', function(req, res) {

	var user = new fideliaUser;

	user.name = req.body.name;
	user.surname = req.body.surname;

	user.save(function(){
		if(err){
			res.send(err);
		};

		res.send('Todo Ok machote');
	});

});

module.exports = router;
