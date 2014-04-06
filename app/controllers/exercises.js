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
            fakes.push(new Exercise({title: 'push-ups', description: 'A push-up is a common calisthenics exercise performed in a prone position by raising and lowering the body using the arms. Push-ups exercise the pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis and the midsection as a whole.',
                video: 'http://www.youtube.com/watch?v=FtcKhNzopTo', minature: 'http://i1.ytimg.com/vi/FtcKhNzopTo/mqdefault.jpg'}));
            fakes.push(new Exercise({title: 'pull-ups', description: 'A pull-up is a variety of upper-body compound pulling motions for the purpose of exercise. The pull-up has two main methods of execution; the first is with a pronated (overhand) grip and the second is with a supinated (underhand) grip.',
                video: 'http://www.youtube.com/watch?v=blpuO2vJo38', minature: 'http://i1.ytimg.com/vi/blpuO2vJo38/mqdefault.jpg'}));
            fakes.push(new Exercise({title: 'squats', description: 'In strength training, the squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips and buttocks, quads (vastus lateralus medialis and intermedius), hamstrings, as well as strengthening the bones, ligaments and insertion of the tendons throughout the lower body.',
                video: 'http://www.youtube.com/watch?v=xK9jzjsTJts', minature: 'http://i1.ytimg.com/vi/xK9jzjsTJts/mqdefault.jpg'}));            
            fakes.push(new Exercise({title: 'stretching', description: 'Stretching is a form of physical exercise in which a specific muscle or tendon (or muscle group) is deliberately flexed or stretched in order to improve the muscles felt elasticity and achieve comfortable muscle tone. The result is a feeling of increased muscle control, flexibility and range of motion. Stretching is also used therapeutically to alleviate cramps.',
                video: 'http://www.youtube.com/watch?v=sVZBZ6wpqmg', minature: 'http://i1.ytimg.com/vi_webp/sVZBZ6wpqmg/mqdefault.webp'}));
            
            res.jsonp(fakes);
        }
    });
};
