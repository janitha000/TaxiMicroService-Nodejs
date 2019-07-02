const logger = require('winston');
const Driver = require('../../Data/Mongodb/Entities/Taxi/driver.model');

exports.get_driver_by_id = (id) => {
    return new Promise((resolve, reject) => {
        Driver.findById(id, (err, result) => {
            if (err) {
                logger.error("Error when getting driver with id");
                reject(err)
            }

            resolve(result)
        })
    })
}

exports.get_drivers = () => {
    return new Promise((resolve, reject) => {
        Driver.find().exec((err, result) => {
            if (err) {
                logger.error("Error when getting drivers");
                reject(err)
            }

            resolve(result)
        })
    })
}

exports.add_driver = (body) => {
    let driver = new Driver(body);
    return new Promise((resolve, reject) => {
        driver.save((err) => {
            if (err) {
                logger.error("Error when getting drivers");
                reject(err)
            }

            resolve('Driver created');
        })
    })
}

exports.get_driver_by_vehicle = (vehicleId) => {
    return new Promise((resolve, reject) => {
        Driver.find({ vehicleId }, (err, result) => {
            if (err) {
                logger.error("Error when getting driver with vehicle");
                reject(err)
            }

            resolve(result)
        })
    })
}

exports.update_driver = (id, body) => {
    return new Promise((resolve, reject) => {
        Driver.findByIdAndUpdate(id, body, {new : true}, (err, res) => {
            if(err){
                logger.error("Error when updating driver " + err);
                reject(err);
            }

            resolve(res);
        })
    })
}

exports.delete_driver = (id) => {
    return new Promise((resolve, reject) => {
        Driver.deleteOne({_id: id}, (err) => {
            if(err){
                logger.error("Error when deleting driver");
                reject(err);
            }

            resolve('Driver deleted');
        })
    })
}