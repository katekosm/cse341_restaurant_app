const express = require('express');
const router = express.Router();

const menusController = require('../controllers/menus');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");
const { isAuthorized } = require("../middleware/authorize");

router.get('/', menusController.getAll
/* 
#swagger.tags = ['Menus']
#swagger.summary = 'Lists all menus'
*/
);

router.get('/:id', menusController.getSingle
/* 
#swagger.tags = ['Menus']
#swagger.summary = 'Shows one menu'
*/
);

router.post('/', isAuthenticated, isAuthorized(2), validation.saveMenu, menusController.createMenu
/* 
#swagger.tags = ['Menus']
#swagger.summary = 'Creates a new menu'
*/
);

router.put('/:id', isAuthenticated, isAuthorized(2), validation.saveMenu, menusController.updateMenu
/* 
#swagger.tags = ['Menus']
#swagger.summary = 'Updates one menu'
*/
);

router.delete('/:id', isAuthenticated, isAuthorized(2), menusController.deleteMenu
/* 
#swagger.tags = ['Menus']
#swagger.summary = 'Deletes one menu'
*/
);

module.exports = router;
