'use strict';

// Stats routes use Stats controller
var stats = require('../controllers/stats');
var authorization = require('./middlewares/authorization');

// Stats authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.stats.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/statistics/:statsId', user.stats);
    app.put('/statistics/:statsId', authorization.requiresLogin, hasAuthorization, stats.update);

    // Finish with setting up the statsId param
    app.param('statsId', user.stats);
    app.param('userId', user.id);
};