const express = require('express');
const router = express.Router();

const customerController = require('../Controllers/CustomerController');

router.get('/customer', customerController.get_all_customers);
// router.post('/customer', customerController.add_customer);
router.delete('/customer/:customerId', customerController.delete_customer);

module.exports = router;