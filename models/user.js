'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({ 

	name 			: String,
	email			: String,
	proffesion      : String,
	hashed_password	: String,
	created_at		: String,
	temp_password	: String,
	temp_password_time: String,
	premission			:String,
	start_job			:String,
	end_job				:String,
	gradiliste 			:String,
	address				:String,
	phone				:String,
	surname				:String
	
	
});


mongoose.Promise = global.Promise;

module.exports = mongoose.model('user', userSchema);
