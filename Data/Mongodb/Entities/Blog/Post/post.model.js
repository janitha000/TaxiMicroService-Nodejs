const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : { type : String, required : true},
    content : {type : String, max: 1000},
    author : {type: mongoose.Schema.Types.ObjectId, ref : 'Author'}
})

module.exports = new Schema('Post', postSchema);