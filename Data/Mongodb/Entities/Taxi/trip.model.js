const mongoose = require('mongoose')
const timestamp = require('./Plugin/timestamp');

let TripSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    vehicle: { type : mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    distance : {type: Number, required: true},
    startLocation: {
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true}
    },
    endLocation: {
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true}
    },
    price: {type: Number, required: true, default: 0},
    startDate : {type: Date},
    endDate: {type: Date},
    status : {type: String, required: true},
    offer: {
        isOffer: {type: Boolean, required: true},
        offerType: {type: String},
        offerDiscount: {type: Number}
    }
})

TripSchema.plugin(timestamp);

module.exports = mongoose.model('Trip', TripSchema);

