'use strict';

const user = require('../models/user');

exports.putJob = (email,start_job,end_job,gradiliste) =>

    new Promise((resolve,reject) => {

   //     user.updateMany({email:email} , {start: start_job,end: end_job })
     user.find({email:email})
            .then(users => {
                let user = users[0];
                let uno=new Date(start_job);
                let due=new Date(end_job);
                user.start_job=uno.toLocaleDateString();
                user.end_job=due.toLocaleDateString();
                user.gradiliste=gradiliste;
                return user.save();
            })

         .then(() => resolve({ status: 201, message: 'Job  Saved Sucessfully !' }))

         .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });
