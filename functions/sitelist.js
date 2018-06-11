'use strict';

const site = require('../models/site');



exports.getSite = () =>


    new Promise((resolve,reject) => {

        site.find({}, {
            name: 1,
            address: 1,
            latlong: 1,
            _id: 0
        })
            .then(site => resolve(site))

            .catch(err => reject({status: 500, message: 'Internal Server Error !'}))


    });
