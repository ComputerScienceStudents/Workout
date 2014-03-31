'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Article = mongoose.model('Exercise'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Exercise.load(id, function(err, exercise) {
        if (err) return next(err);
        if (!exercise) return next(new Error('Failed to load exercise ' + id));
        req.exercise = exercise;
        next();
    });
};

/**
 * Create an exercise
 */
exports.create = function(req, res) {
    var exercise = new Exercise(req.body);
    exercise.user = req.user;

    exercise.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                exercise: exercise
            });
        } else {
            res.jsonp(exercise);
        }
    });
};

/**
 * Update an exercise
 */
exports.update = function(req, res) {
    var article = req.exercise;

    exercise = _.extend(exercise, req.body);

    exercise.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                exercise: exercise
            });
        } else {
            res.jsonp(exercise);
        }
    });
};

/**
 * Delete an exercise
 */
exports.destroy = function(req, res) {
    var exercise = req.exercise;

    exercise.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                exercise: exercise
            });
        } else {
            res.jsonp(exercise);
        }
    });
};

/**
 * Show an exercise
 */
exports.show = function(req, res) {
    res.jsonp(req.exercise);
};

/**
 * List of exercises
 */
exports.all = function(req, res) {
    Exercise.find().sort('-created').populate('user', 'name username').exec(function(err, exercises) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(exercises);
        }
    });
};
