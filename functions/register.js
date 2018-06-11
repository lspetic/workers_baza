'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = (name, email, password,proffesion) =>
    new Promise((resolve,reject) => {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const timeout = setTimeout(() => {
            if (!resolve) {
                reject('Timedout!');
            }
            clearTimeout(timeout);
        }, 100);

       user.findOne({'email': email}, function (err, user) {
            // In case of any error return
            if (err) {
                console.log('Error in SignUp: ' + err);
                reject(new Error('Server Error'));
            }
            // already exists
            if (user) {
                console.log('User already exists');
                reject(new Error('E-mail already in use'));
            } else{

                const newUser = new user({

                    name: name,
                    email: email,
                    hashed_password: hash,
                    created_at: new Date(),
                    proffesion: proffesion


                });
                // save the user
                newUser.save()
                    .then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))
            }
        });

    });


