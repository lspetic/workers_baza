'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const siteSchema=mongoose.Schema({
    name	:String,
    address :String,
    latlong :String

});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/workers');
module.exports = mongoose.model('site', siteSchema,"site"); //zadnji argument označava kolekciju