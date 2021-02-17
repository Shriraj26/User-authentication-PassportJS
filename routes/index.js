const express = require('express')

const router = express.Router();

const passport = require('passport');

const loginController = require('../controllers/loginController');

router.get('/', loginController.login);
//use passport as middleware to authenticate.
router.post('/loginUser', passport.authenticate(
	'local',
	{failureRedirect: '/signin'}
) ,loginController.loginUser);

router.get('/logout', loginController.logout);

router.get('/signin',   require('./signinRoute'));
router.post('/create',   require('./signinRoute'));

//if the user is authenticated then only view the profile
router.get('/profile', passport.checkAuthentication,  loginController.profile);

module.exports = router; 