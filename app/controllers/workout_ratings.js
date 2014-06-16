'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    WorkoutRating = mongoose.model('WorkoutRating');


/**
 * Find rating by id
 */
exports.rating = function(req, res, next, id) {
    WorkoutRating.findOne({_id: id}).exec(function(err, rating) {
        if (err) return next(err);
        if (!rating) return next(new Error('Failed to load rating ' + id));
        req.rating = rating;
        next();
    });
};

/**
 * Create an rating
 */
exports.create = function(req, res) {
    console.log(req.body);
    var rating = new WorkoutRating(req.body);
    rating.user = req.user;
    rating.created = new Date();
    rating.workout = req.param('programId');
    rating.rate = req.param('value');

    rating.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                rating: rating
            });
        } else {
            res.jsonp(rating);
        }
    });
};


/**
 * Show an rating
 */
exports.show = function(req, res) {
    res.jsonp(req.rating);
};

/**
 * List of Ratings
 */
exports.all = function(req, res) {
    WorkoutRating.find().sort('-created').exec(function(err, ratings) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(ratings);
        }
    });
};