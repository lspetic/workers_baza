'use strict';

const user = require('../models/user');

exports.putJob = (email,start_job,end_job,gradiliste) =>

    new Promise((resolve,reject) => {

   //     user.updateMany({email:email} , {start: start_job,end: end_job })
     user.find({email:email})
            .then(users => {
                let user = users[0];
                user.start_job=start_job;
                user.end_job=end_job;
                user.gradiliste=gradiliste;
                return user.save();
            })

//            .then(users => users.save())

//            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });
