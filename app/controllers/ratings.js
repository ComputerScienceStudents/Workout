'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Rating = mongoose.model('Rating'), 
    _ = require('lodash');


/**
 * Find rating by id
 */
exports.rating = function(req, res, next, id) {
    Rating.findOne({_id: id}).populate('exercises.exercise').exec(function(err, rating) {
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
    var rating = new Rating(req.body);
    rating.user = req.user;

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
 * Update an rating
 */
exports.update = function(req, res) {
    var rating = req.rating;

    rating = _.extend(rating, req.body);

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
 * Delete an rating
 */
exports.destroy = function(req, res) {
    var rating = req.rating;

    rating.remove(function(err) {
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
    Rating.find().sort('-created').exec(function(err, ratings) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(ratings);
        }
    });
};