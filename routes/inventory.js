const express = require('express');
const { validate } = require('express-validation');
const validation = require('../middleware/validation');
const inventoryController = require('../controller/inventory');
const {request_validator_admin , request_validator_all} = require('../middleware/session')

const router = express.Router();

router.put('/add_new_inventory', request_validator_admin, validate(validation.add_inventory), inventoryController.add);
router.patch('/update_inventory' , request_validator_admin , validate(validation.update_inventory) , inventoryController.update)
router.get('/get_all_inventory', request_validator_admin, inventoryController.get);
router.get('/get_available_inventory', request_validator_all , inventoryController.getAvail);
router.delete('/delete_inventory' ,request_validator_admin , validate(validation.delete_inventory) , inventoryController.deleteInv  )
router.post('/history_inventory' ,request_validator_admin , validate(validation.delete_inventory) , inventoryController.history  )


module.exports = router;