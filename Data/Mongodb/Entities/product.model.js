const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    id : {type : Number, require : true},
    name: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    created : { type : Date , default : Date.now},
    category : { type: mongoose.Schema.Types.ObjectId, ref : 'Category'}
})

module.exports = mongoose.model('Product', ProductSchema);
