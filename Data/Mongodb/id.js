const mongoose = require('mongoose');

module.exports = function addId(schema){
    schema.add({
        _id : mongoose.Schema.Types.ObjectId,
    });

    schema.pre('save', function(next){
        _id = new mongoose.Schema.Types.ObjectId();
        next();
    })
}