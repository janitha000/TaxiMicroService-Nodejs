const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name : {
        firstName : {type : String, max : 100},
        lastName : {type : String, max : 100}
    }

})

authorSchema.virtual('FullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
})

module.exports = new mongoose.Schema('Author', authorSchema);