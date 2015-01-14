var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var fideliappSchema   = new Schema({
	name : String, // Nombre del usuario
	provider: String, // Facebook o Email
	provider_id : {type: String, unique: true}, // ID que proporciona Twitter o Facebook...
	photo : String, // Avatar o foto del usuario
	gender : String,
	email : String,
	password: String,
	verify: Boolean,
	createdAt : {type: Date, default: Date.now} // Fecha de creación
});

module.exports = mongoose.model('fideliaUser', fideliappSchema);