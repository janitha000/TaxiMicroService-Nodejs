const driverHelper = require('../../Helpers/Taxi/DriverHelper');
const logger = require('winston');

exports.get_driver_by_id = (req, res) => {
    const id = req.params.driverId;

    driverHelper.get_driver_by_id(id).then((result) => {
        console.log(result.fullName);
        res.send(result);
    }).catch((err) => {
        logger.error(`Error when getting driver with id ${err}`)
        res.send(err);
    })
}

exports.get_drivers = (req, res) => {
    driverHelper.get_drivers().then((result) => {
        res.send(result);
    }).catch((err) => {
        logger.error(`Error when getting driver with id ${err}`)
        res.send(err);
    })
}

exports.add_driver = async (req, res) => {
    await driverHelper.add_driver(req.body).then((result) => {
        res.send(result)
    }).catch(err => {
        logger.error(`Error when getting driver with id ${err}`)
        res.send(err);
    })
}

exports.update_driver = async (req, res) => {
    try{
        const result = await driverHelper.update_driver(req.params.driverid, req.body)
        res.send(result);
    }
    catch(err) {
        logger.error("Error when updating driver " + err);
        res.status(500).send(err);
    }
}

exports.delete_drver = async (req, res) => {
    try{
        const result = await driverHelper.delete_driver(req.params.driverid);
        res.send(result)
    }
    catch(err){
        logger.error("Error when deleting driver");
        res.send(err);
    }

}

