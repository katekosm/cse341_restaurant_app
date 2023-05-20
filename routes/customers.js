const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticate");

const customersController = require('../controllers/customers');
const validation = require('../middleware/validate');

router.get('/', customersController.getAll
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Lists all customers'
*/
);

router.get('/my-account', isAuthenticated, customersController.getMyAccount
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Gets Account of Currently Logged User'
*/
)

router.put('/:id', validation.saveCustomer, customersController.updateCustomer
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Updates one customer'
*/
);

router.delete('/:id', customersController.deleteCustomer
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Deletes one customer'
*/
);

module.exports = router;
