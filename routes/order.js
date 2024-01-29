const express = require('express');
const { validate } = require('express-validation');
const validation = require('../middleware/validation');
const orderController = require('../controller/order');
const {request_validator_all} = require('../middleware/session')

const router = express.Router();

router.post('/place_order', request_validator_all , validate(validation.place_order), orderController.order);
router.post('/order_details', request_validator_all , validate(validation.order_details), orderController.details);


module.exports = router;