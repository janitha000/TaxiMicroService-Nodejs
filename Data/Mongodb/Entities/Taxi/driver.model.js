const mongoose = require('mongoose');
const timestamp = require('./Plugin/timestamp')

let DriverSchema = new mongoose.Schema({
    name : {
        firstName : {type: String, required: true, max : 100},
        lastName : {type: String, max: 100}
    },
    age : {type: Number, max: 100},
    nic: {type: String, min:10, max:11 },
    vehicles : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'}]
})

DriverSchema.plugin(timestamp);

DriverSchema.virtual('fullname').get(()=> {
    return `${this.name.firstName} ${this.name.lastName}`
})

module.exports = mongoose.model('Driver', DriverSchema);


