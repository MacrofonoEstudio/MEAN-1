var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var fideliappSchema   = new Schema({
	name: String,
	surname: String
});

module.exports = mongoose.model('fideliaUser', fideliappSchema);