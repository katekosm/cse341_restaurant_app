const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const validation = require('../middleware/validate');

router.get('/', ordersController.getAll
/* 
#swagger.tags = ['Orders']
#swagger.summary = 'Lists all orders'
*/
);

router.get('/:id', ordersController.getSingle
/* 
#swagger.tags = ['Orders']
#swagger.summary = 'Shows one order'
*/
);

router.post('/', validation.saveOrder, ordersController.createOrder
/* 
#swagger.tags = ['Orders']
#swagger.summary = 'Creates a new order'
*/
);

router.put('/:id', validation.saveOrder, ordersController.updateOrder
/* 
#swagger.tags = ['Orders']
#swagger.summary = 'Updates one order'
*/
);

router.delete('/:id', ordersController.deleteOrder
/* 
#swagger.tags = ['Orders']
#swagger.summary = 'Deletes one order'
*/
);

module.exports = router;
