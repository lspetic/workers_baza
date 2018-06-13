'use strict';

const site = require('../models/site');



exports.getSite = () =>


    new Promise((resolve,reject) => {

        site.find({}, {
            name: 1,
            address: 1,
            latlong: 1,
            br_radnika:1,
            _id: 0
        })
            .then(site => resolve(site))

            .catch(err => reject({status: 500, message: 'Internal Server Error !'}))


    });


exports.getSiteOne = (name) =>


    new Promise((resolve,reject) => {

        site.find({name:name}, {
            name: 1,
            address: 1,
            latlong: 1,
            br_radnika:1,
            _id: 0
        })
            .then(site => resolve(site[0]))

            .catch(err => reject({status: 500, message: 'Internal Server Error !'}))


    });

exports.putSite = (name,br_radnika,address,latlong) =>

    new Promise((resolve,reject) => {

        //     user.updateMany({email:email} , {start: start_job,end: end_job })
        site.find({name:name})
            .then(sites => {
                let site = sites[0];
                site.name=name;
                site.br_radnika=br_radnika;
                console.log(br_radnika);
                site.address=address;
                site.latlong=latlong;

                return site.save();
            })

            .then(() => resolve({ status: 201, message: 'Job  Saved Sucessfully !' }))

            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });
