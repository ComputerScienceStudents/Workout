'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Stats = mongoose.model('Stats'), 
    _ = require('lodash');

/**
 * Create an stats
 */
exports.create = function(req, res) {
    var stats = new Stats(req.body);
    stats.user = req.user;

    stats.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                stats: stats
            });
        } else {
            res.jsonp(stats);
        }
    });
};

/**
 * Update an stats
 */
exports.update = function(req, res) {
    var stats = req.user.stats;
    stats.workouts.push({
        date : Date.now,
        exercises : req.exercises
    });

    stats.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                stats: stats
            });
        } else {
            res.jsonp(stats);
        }
    });
};

/**
 * Delete an stats
 */
exports.destroy = function(req, res) {
    var stats = req.stats;

    stats.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                stats: stats
            });
        } else {
            res.jsonp(stats);
        }
    });
};

/**
 * Show an stats
 */
exports.show = function(req, res) {
    res.jsonp(req.stats);
};
