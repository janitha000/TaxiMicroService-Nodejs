const vehicleHelper = require('../../Helpers/Taxi/VehicleHelper');
const logger = require('winston');


exports.add_vehicle = (req, res) => {
    vehicleHelper.add_vehicle(req.body).then((result) => {
        res.send(result)
    }).catch((err) => {
        logger.error('Error when adding price ' + err);
        res.send(err);
    })
}

exports.get_vehicles = async (req, res) => {
    await vehicleHelper.get_vechiles().then((result) => {
        res.send(result);
    }).catch((err) => {
        logger.error("Error when getting vehicles");
        res.send(err);
    })
}

exports.delete_vehicle = (req, res) => {
    vehicleHelper.delete_vehicle(req.params.vehicleId).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send(err);
    })
}