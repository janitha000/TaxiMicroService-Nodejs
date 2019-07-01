var express = require('express');
var router = express.Router();

const vehicleController = require('../Controllers/Taxi/VehicleController');
var driverController = require('../Controllers/Taxi/DriverController')
var priceController = require('../Controllers/Taxi/PriceController')

router.get('/driver/:driverId', driverController.get_driver_by_id);
//router.get('/driver/vehichle/:vehicleId', driverController.get_driver_by_vehicle);

router.post('/price', priceController.add_price);

router.get('/vehicle', vehicleController.get_vehicles);
router.post('/vehicle', vehicleController.add_vehicle);

module.exports = router;