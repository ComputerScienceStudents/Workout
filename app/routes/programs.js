'use strict';

// Articles routes use articles controller
var programs = require('../controllers/programs');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.program.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/programs', programs.all);
    app.post('/programs', authorization.requiresLogin, programs.create);
    app.get('/programs/:programId', programs.show);
    app.put('/programs/:programId', authorization.requiresLogin, hasAuthorization, programs.update);
    app.del('/programs/:programId', authorization.requiresLogin, hasAuthorization, programs.destroy);

    // Finish with setting up the programId param
    app.param('programId', programs.program);

};