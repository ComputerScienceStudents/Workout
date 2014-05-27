'use strict';

// Articles routes use articles controller
var ratings = require('../controllers/ratings');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {
    app.get('/ratings/:ratingId', authorization.requiresLogin, ratings.show);
    app.put('/ratings/:ratingId/:value', authorization.requiresLogin, ratings.update);

    // Finish with setting up the ratingId param
    app.param('ratingId', ratings.rating);
};