const mongoose = require('mongoose')
const timestamp = require('./Plugin/timestamp');

let VehicleSchema = new mongoose.Schema({
    number: {type:String, required: true, max:6},
    type: { type: String, required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    price: { type: mongoose.Schema.Types.ObjectId, ref: 'Price' }
})

VehicleSchema.plugin(timestamp);



function VehicleCategory(key, options) {
    mongoose.SchemaType.call(this, key, options, 'VehicleCategory')
}

VehicleCategory.prototype = Object.create(mongoose.SchemaType.prototype);
VehicleCategory.prototype.cast = function (val) {
    let vehicleTypes = ['Taxi', 'Car', 'Luxury Car', 'Van', 'Bus']
    if (vehicleTypes.includes(val)) {
        throw new Error(`VehicleCategory ${val} is not a valid VehicleCategory`)
    }

    return val;
}

module.exports = mongoose.model('Vehicle', VehicleSchema);
