const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('../timestamp')
const id = require('../id');

let CategorySchema = mongoose.Schema({
    name : { type : String, required : true}

})

CategorySchema.plugin(timestamp);


module.exports = mongoose.model('Category',CategorySchema );