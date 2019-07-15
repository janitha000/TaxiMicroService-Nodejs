const Vehicle = require('../../Data/Mongodb/Entities/Taxi/vehicle.model');
const logger = require('winston');


exports.add_vehicle = (body) => {
    let vehicle = new Vehicle(body)

    return new Promise((resolve, reject) => {
        vehicle.save((err) => {
            if (err) {
                logger.error("Error when adding vehicle");
                reject(err);
            }

            resolve('Vehicle Added');
        })
    })
}

exports.get_vechiles = () => {
    return new Promise((resolve, reject) => {
        Vehicle.find().exec((err, result) => {
            if (err) {
                logger.error("Error when getting vehicle");
                reject(err);
            }
            resolve(result);
        })
    })
}

exports.delete_vehicle = (id) => {
    return new Promise((resolve, reject) => {
        Vehicle.deleteOne({_id: id}, (err) => {
            if(err){
                logger.error("Error when deleting vehicle " + err);
                reject(err);
            }

            resolve('Vehicle Deteled');
        })
    })
}