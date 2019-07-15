const mongoose = require('mongoose')
const timestamp = require('./Plugin/timestamp');

let VehicleSchema = new mongoose.Schema({
    number: {type:String, required: true, max:6},
    isActive: {type: Boolean, required: true, default: false},
    isBooked : {type: Boolean, required: true, default: false },
    Location: { 
        latitude: {type: Number},
        longitude: {type: Number}
    },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    price: { type: mongoose.Schema.Types.ObjectId, ref: 'Price' }
})

VehicleSchema.plugin(timestamp);


module.exports = mongoose.model('Vehicle', VehicleSchema);
