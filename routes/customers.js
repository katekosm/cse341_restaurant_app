const express = require('express');
const router = express.Router();

const customersController = require('../controllers/customers');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");
const { isAuthorized } = require("../middleware/authorize");

router.get('/', isAuthenticated, isAuthorized(2), customersController.getAll
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Lists all customers'
*/
);

router.get('/:id', isAuthenticated, isAuthorized(2), customersController.getSingle
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Lists one customer'
*/
);

router.post('/', isAuthenticated, isAuthorized(2), validation.saveCustomer, customersController.createDummyCustomer
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Creates a new customer, unless an user with the same Google ID already exists'
*/
);

router.put('/:id', isAuthenticated, isAuthorized(2), validation.updateCustomer, customersController.updateCustomer
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Updates one customer'
*/
);

router.delete('/:id', isAuthenticated, isAuthorized(2), customersController.deleteCustomer
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Deletes one customer'
*/
);

module.exports = router;
