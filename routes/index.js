const express = require('express');
const router = express.Router();
const path = require('path');


router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.sendFile(path.join(__dirname, '../views/index.html'));
  });

router.use('/', require('./swagger'));
router.use('/menus', require('./menus'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/customers', require('./customers'));

module.exports = router;