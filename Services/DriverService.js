var DriverRepo = require('../Data/SQLServer/DriverRepo')
var logger = require('../Util/winston');

exports.GetDriverList = function(callback){
    let drivers = DriverRepo.GetDriverList(function(err, data){
        if(err){
            logger.error(err);
            callback(err)
        }
        logger.info("Data returned");
        callback(null, drivers);

    })    
};

exports.GetDriverListPromise = function(){
    return new Promise(function(resolve, reject){
        DriverRepo.GetDriverList(function(err, data){
            if(err){
                reject(err)
            }
            else{
                resolve(data);
            }
        })
    })
}