'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Exercise = mongoose.model('Exercise'),
    _ = require('lodash');


/**
 * Find exercise  by id
 */
exports.exercise = function(req, res, next, id) {
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
    var exercise = req.exercise;

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
            // fake exercises
            var fakes = [];
            fakes.push(new Exercise({title: 'push-ups', description: 'A push-up is a common calisthenics exercise performed in a prone position by raising and lowering the body using the arms. Push-ups exercise the pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis and the midsection as a whole. Push-ups are a basic exercise used in civilian athletic training or physical education and commonly in military physical training. They are also a common form of punishment used in the military, school sport, or in some martial arts dojos.',
                video: 'http://www.youtube.com/watch?v=zF0jbubK_jU', minature: 'http://i1.ytimg.com/vi/zF0jbubK_jU/mqdefault.jpg'}));
            fakes.push(new Exercise({title: 'pull-ups', description: 'A pull-up is a variety of upper-body compound pulling motions for the purpose of exercise. The pull-up has two main methods of execution; the first is with a pronated (overhand) grip and the second is with a supinated (underhand) grip.',
                video: 'http://www.youtube.com/watch?v=QZF0Uz7rty8', minature: 'http://i1.ytimg.com/vi/QZF0Uz7rty8/mqdefault.jpg'}));

            
            res.jsonp(fakes);
        }
    });
};
