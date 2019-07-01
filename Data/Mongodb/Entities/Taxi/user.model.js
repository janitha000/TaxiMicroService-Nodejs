const mongoose = require('mongoose')
const timestamp = require('./Plugin/timestamp');

let UserSchema = new mongoose.Schema({
    name : {
        fristName : {type: String, required: true, max:100},
        lastName : {type: String, max: 100},
    }
})

UserSchema.plugin(timestamp);

module.exports = mongoose.model('User', UserSchema);