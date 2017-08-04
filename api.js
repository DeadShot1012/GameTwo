var user_id = require('./schema.js');


module.exports = {
	add_user: function(data,cb){
		user_id.create(data,function(err,result){
			console.log(data);
			if (err) {
				return cb(err,null);
			}
			else
			{
				return cb(null,result);
			}
		});
	},

	find_user : function(data,cb) {
		user_id.findOne(data,function(err,result) {
			console.log(result);
			if(err)
				return cb(err,null);
			else
				return cb(null,result);

		});
	},

	verify : function(data,cb) {
		user_id.findByIdAndUpdate(data, { $set: { status: 1 }}, { new: true },function(err,result) {
			
			if(err)
				return cb(err,null);
			else
				return cb(null,result);
		});
	},

	login : function(data,cb) {
		user_id.find(data,function(err,result) {
			
			if(err)
				return cb(err,null);
			else
				return cb(null,result);
		});
	},


	users : function(cb){

		user_id.find({status:1}).sort({time:-1}).limit(20).exec(function(err,result) {
			
			if(err)
				return cb(err,null);
			else
				return cb(null,result);
			
		});
	},
	update_time : function(_id,time,cb){
		user_id.findByIdAndUpdate(_id,{$set:{'time':time}},{new:true},function(err,result){
			if(err)
				return cb(err,null);
			else
				return cb(null,result);
		});
	}

}