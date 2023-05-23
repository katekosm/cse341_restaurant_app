const express = require('express');
const router = express.Router();

const customersController = require('../controllers/customers');
const validation = require('../middleware/validate');

router.get('/', customersController.getAll
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Lists all customers'
*/
);

router.get('/:id', customersController.getSingle
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Lists one customer'
*/
);

router.post('/', validation.saveCustomer, customersController.createDummyCustomer
/* 
#swagger.tags = ['Customers']
#swagger.summary = 'Creates a new customer, unless an user with the same Google ID already exists'
*/
);

router.put('/:id', validation.updateCustomer, customersController.updateCustomer
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
