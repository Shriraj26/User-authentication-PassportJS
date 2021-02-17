const User = require('../models/user');

module.exports.login = function(req, res){
	
	console.log(req.cookies);
	if(req.isAuthenticated()){
		res.redirect('/profile');
	}
	else{
		return res.render('login');
	}

	// return res.render('login');

}


module.exports.profile = function(req, res){
	return res.render('user_details', {
		title: "User Profile"
	});
}

module.exports.loginUser = function(req, res){
	return res.redirect('/profile');

}

module.exports.logout = function(req, res){


	req.logout();
	//take the user back to the login page
	return res.redirect('/');
}