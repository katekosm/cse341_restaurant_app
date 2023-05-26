const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', usersController.getAll
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Lists all users'
*/
);

router.get('/:id', usersController.getSingle
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Shows one user'
*/
);

router.post('/', isAuthenticated, validation.saveUser, usersController.createUser
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Creates a new user'
*/
);

router.put('/:id', isAuthenticated, validation.saveUser, usersController.updateUser
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Updates one user'
*/
);

router.delete('/:id', isAuthenticated, usersController.deleteUser
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Deletes one user'
*/
);

module.exports = router;
