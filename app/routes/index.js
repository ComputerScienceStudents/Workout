'use strict';


module.exports = function(app) {

	var needAuthentication = function(req,res,next){
		if(!req.isAuthenticated()){
			return res.redirect('/signin/');
		}
		next();
	}
    
    // Home route
    var index = require('../controllers/index');
    app.get('/', needAuthentication, index.render);

};
