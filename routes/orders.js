const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");
const { isAuthorized } = require("../middleware/authorize");

router.get('/', isAuthenticated, isAuthorized(2), ordersController.getAll
/* 
#swagger.tags = ['Orders']
#swagger.summary = 'Lists all orders'
*/
);

router.get('/:id', isAuthenticated, isAuthorized(2), ordersController.getSingle
/* 
#swagger.tags = ['Orders']
#swagger.summary = 'Shows one order'
*/
);

router.post('/', isAuthenticated, isAuthorized(2), validation.saveOrder, ordersController.createOrder
/* 
#swagger.tags = ['Orders']
#swagger.summary = 'Creates a new order'
*/
);

router.put('/:id', isAuthenticated, isAuthorized(2), validation.saveOrder, ordersController.updateOrder
/* 
#swagger.tags = ['Orders']
#swagger.summary = 'Updates one order'
*/
);

router.delete('/:id', isAuthenticated, isAuthorized(2), ordersController.deleteOrder
/* 
#swagger.tags = ['Orders']
#swagger.summary = 'Deletes one order'
*/
);

module.exports = router;
