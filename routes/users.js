const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');

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

router.post('/', validation.saveUser, usersController.createUser
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Creates a new user'
*/
);

router.put('/:id', validation.saveUser, usersController.updateUser
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Updates one user'
*/
);

router.delete('/:id', usersController.deleteUser
/* 
#swagger.tags = ['Users']
#swagger.summary = 'Deletes one user'
*/
);

module.exports = router;
