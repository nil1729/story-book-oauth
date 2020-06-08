const express = require('express');
const router = express.Router();
const passport = require('passport');


// page for rendeing Oauth
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Call back URL
router.get('/google/callback', 
  passport.authenticate('google'),
  function(req, res) {
         res.redirect('/users/dashboard');
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logOut();
     res.redirect('/');
});


module.exports = router;