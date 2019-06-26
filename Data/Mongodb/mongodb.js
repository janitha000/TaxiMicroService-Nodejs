const mongoose = require('mongoose');
const logger = require('../../Util/winston')

class monngoDb {
    StartDbwithMongoose (){
        const mongodbUrl = 'mongodb+srv://root:root@cluster0-0e4wi.mongodb.net/TaxiNodeDB?retryWrites=true&w=majority'
        mongoose.connect(mongodbUrl, function(err, result){
            if(err){
                logger.error("Error when connecting to mongoDB " + err)
            }
            else{
                logger.info("Mongodb database connected");
            }
        });
        mongoose.Promise = global.Promise;
        const dbConnection = mongoose.connection;
        
        dbConnection.on('error', console.error.bind(console, 'MongoDb connection error '));
    }
}

module.exports = new monngoDb;