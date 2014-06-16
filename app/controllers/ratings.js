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
    Rating.findOne({_id: id}).exec(function(err, rating) {
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

    var value = req.param('value');
    var userId = req.user._id;

    var average = 0;
    var updated = false;
    for(var i = 0; i < rating.rates.length; i++) {
        if(rating.rates[i].user.equals(userId)) {
            updated = true;
            rating.rates[i].rate = value;
        } 
        average += rating.rates[i].rate;
    }
    if(!updated) {
        rating.rates.push({user: userId, rate: value});
        average += value;
    }

    rating.average = average/rating.rates.length;
    rating.usersCount = rating.rates.length;

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
    var userRate = 0;
    var userId = req.user._id;
    for(var i = 0; i < req.rating.rates.length; i++) {
        if(req.rating.rates[i].user.equals(userId)) {
            userRate = req.rating.rates[i].rate;
        }
    }
    res.jsonp({average: req.rating.average, _id: req.rating._id, usersCount: req.rating.usersCount, userRate: userRate});
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