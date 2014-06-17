'use strict';

var workout_ratings = require('../controllers/workout_ratings');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {
    app.put('/workout_ratings/:programId/:value', authorization.requiresLogin, workout_ratings.create);

    // Finish with setting up the ratingId param
    app.param('workoutRatingId', workout_ratings.rating);
};