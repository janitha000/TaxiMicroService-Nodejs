var express = require('express');
var router = express.Router();

var driverController = require('../Controllers/DriverController');
var authController = require('../Controllers/AuthController');
var testController = require('../Controllers/TestController');
var productController = require('../Controllers/ProductController');

var authMiddleware = require('../MIddleware/AuthMiddleware');

router.get('/driver', driverController.driver_list);
router.get('/driver/:driverId', driverController.single_driver);
router.post('/driver', authMiddleware.Validate, driverController.add_driver);

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/validate', authController.validate_token);

router.get('/test/cache/:key', testController.GetCache);
router.post('/test/cache/:key', testController.setCache);

router.get('/product/:id', productController.get_single_product);
router.post('/product', productController.add_product);

module.exports = router;

