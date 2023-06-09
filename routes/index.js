const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const { isLoggedIn } = require('../middleware/loggedIn');

router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.sendFile(path.join(__dirname, '../views/index.html'));
  });

router.use('/', require('./swagger'));
router.use('/menus', require('./menus'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/customers', require('./customers'));
router.use('/my-account', require('./my-account'));

// Passport login and logout
router.get('/login',
  isLoggedIn,
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }), 
  //(req, res) => {}
/* 
#swagger.tags = ['Login, Logout Process']
#swagger.summary = 'Logs Customers Into their Acounts'
*/
);
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/logged-status');
  });
}
/* 
#swagger.tags = ['Login, Logout Process']
#swagger.summary = 'Logs Customers or Users Out of their Acounts'
*/
);

module.exports = router;
