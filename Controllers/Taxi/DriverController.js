const driverHelper = require('../../Helpers/Taxi/DriverHelper');
const logger = require('winston');

exports.get_driver_by_id = (req, res) =>{
    const id = req.params.driverId;

    driverHelper.get_driver_by_id(id).then((result) => {
        console.log(result.fullName);
        res.send(result);
    }).catch((err)=>{
        logger.error(`Error when getting driver with id ${err}`)
        res.send(err);
    })
}

// exports.get_driver_by_vehicle = (req, res) => {
//     const category = 
// }

