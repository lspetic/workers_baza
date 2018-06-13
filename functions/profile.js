'use strict';

const user = require('../models/user');

exports.getProfileAll = () =>

	
	new Promise((resolve,reject) => {

            user.find({}, {
                name: 1,
                email: 1,
                created_at: 1,
                profession: 1,
                start_job: 1,
                end_job: 1,
                gradiliste: 1,
                surname:1,
                phone:1,
                address:1,
                _id: 0
            })
                .then(users => resolve(users))

                .catch(err => reject({status: 500, message: 'Internal Server Error !'}))


        });
exports.getProfileAv = (sort1) =>


    new Promise((resolve,reject) => {

        user.find({gradiliste:{$exists:false}}, {
            name: 1,
            email: 1,
            created_at: 1,
            profession: 1,
            start_job: 1,
            end_job: 1,
            gradiliste: 1,
            surname:1,
            phone:1,
            address:1,
            _id: 0
        })
            .then(users => resolve(users))

            .catch(err => reject({status: 500, message: 'Internal Server Error !'}))


    });
exports.getProfileUn = sort1 =>
    new Promise((resolve,reject) => {

        user.find({gradiliste:{$exists:true}}, {
            name: 1,
            email: 1,
            created_at: 1,
            profession: 1,
            start_job: 1,
            end_job: 1,
            gradiliste: 1,
            surname:1,
            phone:1,
            address:1,
            _id: 0
        })
            .then(users => resolve(users))

            .catch(err => reject({status: 500, message: 'Internal Server Error !'}))


    });

exports.getSearch = item =>
    new Promise((resolve,reject) => {

        user.find({$or:[{name:{$regex:item}}  , {email:{$regex:item}} ,{profession:{$regex:item}},{gradiliste:{$regex:item}} ]},{
            name: 1,
            email: 1,
            created_at: 1,
            profession: 1,
            start_job: 1,
            end_job: 1,
            gradiliste: 1,
            surname:1,
            phone:1,
            address:1,
            _id: 0
        },(err,work)=>{
            if(err) handleEvent(err);
            console.log(work);
        })
            .then(users => resolve(users))

            .catch(err => reject({status: 500, message: 'Internal Server Error !'}))


    });
exports.getProfileMy = (email) =>


    new Promise((resolve,reject) => {

        user.find({email:email}, {
            name: 1,
            email: 1,
            created_at: 1,
            profession: 1,
            start_job: 1,
            end_job: 1,
            gradiliste: 1,
            surname:1,
            phone:1,
            address:1,
            _id: 0
        })
            .then(users => resolve(users[0]))

            .catch(err => reject({status: 500, message: 'Internal Server Error !'}))


    });






