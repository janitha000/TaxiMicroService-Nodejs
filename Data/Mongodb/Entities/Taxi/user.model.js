const mongoose = require('mongoose')
const timestamp = require('./Plugin/timestamp');

let UserSchema = new mongoose.Schema({
    name: {
        fristName: {
            type: String,
            required: true,
            max: 100
        },
        lastName: {
            type: String, max: 100
        },
    },
    phone: { type: Number, required: true, max: 10, unique:true },
    address: { type: String },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    }
})

UserSchema.plugin(timestamp);

module.exports = mongoose.model('User', UserSchema);