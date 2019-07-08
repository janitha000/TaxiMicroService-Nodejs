var express = require('express');
var router = express.Router();

const vehicleController = require('../Controllers/Taxi/VehicleController');
var driverController = require('../Controllers/Taxi/DriverController')
var priceController = require('../Controllers/Taxi/PriceController')

router.get('/driver', driverController.get_drivers);
router.get('/driver/:driverId', driverController.get_driver_by_id);
router.post('/driver', driverController.add_driver);
router.put('/driver/:driverid', driverController.update_driver);
router.delete('/driver/:driverid', driverController.delete_drver);
//router.get('/driver/vehichle/:vehicleId', driverController.get_driver_by_vehicle);

router.post('/price', priceController.add_price);
router.get('/price', priceController.get_prices);
router.get('/price/:driverid/:vehicleid', priceController.get_detailed_details);

router.get('/vehicle', vehicleController.get_vehicles);
router.post('/vehicle', vehicleController.add_vehicle);

module.exports = router;

