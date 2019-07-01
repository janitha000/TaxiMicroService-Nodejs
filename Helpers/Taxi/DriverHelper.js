const logger= require('winston');
const Driver = require('../../Data/Mongodb/Entities/Taxi/driver.model');

exports.get_driver_by_id = (id) => {
    return new Promise((resolve, reject) => {
        Driver.findById(id, (err, result)=>{
            if(err){
                logger.error("Error when getting driver with id");
                reject(err)
            }

            resolve(result)
        })
    })
}

exports.get_driver_by_vehicle = (vehicleId) => {
    return new Promise((resolve, reject)=> {
        Driver.find({ vehicleId }, (err, result) => {
            if(err){
                logger.error("Error when getting driver with vehicle");
                reject(err)
            }

            resolve(result)
        })
    })
}