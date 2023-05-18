const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');


router.get("/", (req, res) => {
  // #swagger.ignore = true
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  });

router.use('/', require('./swagger'));
router.use('/menus', require('./menus'));
router.use('/orders', require('./orders'));
router.use('/users', requiresAuth(), require('./users'));
router.use('/customers', requiresAuth(), require('./customers'));

module.exports = router;