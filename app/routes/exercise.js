'use strict';

// Exercise routes use exercises controller
var exercises = require('../controllers/exercises');
var authorization = require('./middlewares/authorization');

// Exercise authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.exercise.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/exercises', exercises.all);
    app.post('/exercises', authorization.requiresLogin, exercises.create);
    app.get('/exercises/:exerciseId', exercises.show);
    app.put('/exercises/:exerciseId', authorization.requiresLogin, hasAuthorization, exercises.update);
    app.del('/exercises/:exerciseId', authorization.requiresLogin, hasAuthorization, exercises.destroy);

    // Finish with setting up the exerciseId param
    app.param('exerciseId', exercises.exercise);

};