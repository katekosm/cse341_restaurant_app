const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticate");

const myAccountController = require('../controllers/my-account');
const validation = require('../middleware/validate');

router.get('/', isAuthenticated, myAccountController.getMyAccount
/* 
#swagger.tags = ['My Account, Customers']
#swagger.summary = 'Gets Account of Currently Logged User'
*/
);

router.put('/', isAuthenticated, validation.updateCustomer, myAccountController.updateMyAccount
/* 
#swagger.tags = ['My Account, Customers']
#swagger.summary = 'Updates Account of Currently Logged User'
*/
);

router.delete('/', isAuthenticated, myAccountController.deleteMyAccount
/* 
#swagger.tags = ['My Account, Customers']
#swagger.summary = 'Deletes Account of Currently Logged User'
*/
);

module.exports = router;
