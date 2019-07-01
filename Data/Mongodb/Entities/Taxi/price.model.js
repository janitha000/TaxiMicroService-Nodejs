const mongoose = require('mongoose')
const timestamp = require('./Plugin/timestamp');

let PriceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
})

PriceSchema.plugin(timestamp);

module.exports = mongoose.model('Price', PriceSchema);