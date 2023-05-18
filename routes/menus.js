const express = require('express');
const router = express.Router();

const menusController = require('../controllers/menus');
const validation = require('../middleware/validate');

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

router.post('/', validation.saveMenu, menusController.createMenu
/* 
#swagger.tags = ['Menus']
#swagger.summary = 'Creates a new menu'
*/
);

router.put('/:id', validation.saveMenu, menusController.updateMenu
/* 
#swagger.tags = ['Menus']
#swagger.summary = 'Updates one menu'
*/
);

router.delete('/:id', menusController.deleteMenu
/* 
#swagger.tags = ['Menus']
#swagger.summary = 'Deletes one menu'
*/
);

module.exports = router;
