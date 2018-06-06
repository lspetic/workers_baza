'use strict';

const user = require('../models/user');

exports.getProfile = email => 
	
	new Promise((resolve,reject) => {

		user.find({} , {email: 1, created_at: 1,proffesion: 1, _id: 0 })

		.then(users => resolve(users))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});
