var express = require('express');
var router = express.Router();


var driverTestController = require('../Controllers/DriverController');
var authController = require('../Controllers/AuthController');
var testController = require('../Controllers/TestController');
var productController = require('../Controllers/ProductController');
var monitorController = require('../Controllers/MonotorController');



var authMiddleware = require('../MIddleware/AuthMiddleware');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/validate', authController.validate_token);

router.get('/test/cache/:key', testController.GetCache);
router.post('/test/cache/:key', testController.setCache);
router.get('/test/ticks', testController.get_ticks);

router.get('/product/:name', productController.get_single_product);
router.get('/product', productController.get_products);
router.get('/product/category/categories/:category', productController.get_products_for_categoies_onlyname);
router.get('/product/category/categories', productController.get_categories);
router.post('/product', productController.add_product);
router.put('/product/:id', productController.update_product);
router.post('/product/category/categories', productController.add_category);
router.put('/product/category/categories/:id', productController.update_category);

router.get('/drivertest', driverTestController.driver_list);
router.get('/drivertest/:driverId', driverTestController.single_driver);
router.post('/drivertest', authMiddleware.Validate, driverTestController.add_driver);

router.get('/health/cpu', monitorController.get_cpu_info);


module.exports = router;

