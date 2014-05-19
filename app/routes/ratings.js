'use strict';

// Articles routes use articles controller
var ratings = require('../controllers/ratings');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.rating.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/ratings', ratings.all);
    app.post('/ratings', authorization.requiresLogin, ratings.create);
    app.get('/ratings/:ratingId', ratings.show);
    app.put('/ratings/:ratingId', authorization.requiresLogin, hasAuthorization, ratings.update);
    app.del('/ratings/:ratingId', authorization.requiresLogin, hasAuthorization, ratings.destroy);

    // Finish with setting up the ratingId param
    app.param('ratingId', ratings.rating);

};