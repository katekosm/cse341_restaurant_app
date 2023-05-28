const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");
const { isAuthorized } = require("../middleware/authorize");
const { isLoggedIn } = require('../middleware/loggedIn');

router.get('/', isAuthenticated, isAuthorized(3), usersController.getAll
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Lists all users'
*/
);

router.get('/:id', isAuthenticated, isAuthorized(3), usersController.getSingle
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Shows one user'
*/
);

router.post('/', validation.saveUser, usersController.createUser
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Creates a new user'
*/
);

router.put('/:id', isAuthenticated, isAuthorized(3), validation.saveUser, usersController.updateUser
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Updates one user'
*/
);

router.delete('/:id', isAuthenticated, isAuthorized(3), usersController.deleteUser
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Deletes one user'
*/
);

router.post('/login', isLoggedIn, usersController.loginUser
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Login in a new user'
*/
);

module.exports = router;
