const mongoose = require('mongoose')
const timestamp = require('./Plugin/timestamp');

let TripSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    vehicle: { type : mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    distance : {type: Number, required: true},
    price: {type: Number, required: true},
    startDate : {type: Date},
    endDate: {type: Date},
    status : {type}
})

TripSchema.plugin(timestamp);

module.exports = mongoose.model('Trip', TripSchema);

//status - cancelled, confirmed, ongoing, finished