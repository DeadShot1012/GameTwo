var mongoose = require('mongoose');

var personSchema = mongoose.Schema ({
	name:{type:String},
	email:{type:String},
	password:{type:String},
	photo:{type:String},
	time:{type:String, default:'00.00'},
	status:{type:Boolean, default:0}
});

module.exports = mongoose.model("login",personSchema);