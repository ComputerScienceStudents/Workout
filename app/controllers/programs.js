'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Program = mongoose.model('Program'), 
    _ = require('lodash');


/**
 * Find program by id
 */
exports.program = function(req, res, next, id) {
    Program.findOne({_id: id}).populate('exercises.exercise').populate('user', 'name username').populate('rating').populate('-rating.rates').exec(function(err, program) {
        if (err) return next(err);
        if (!program) return next(new Error('Failed to load program ' + id));
        req.program = program;
        next();
    });
};

/**
 * Create an program
 */
exports.create = function(req, res) {
    var program = new Program(req.body);
    program.user = req.user;

    program.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                program: program
            });
        } else {
            res.jsonp(program);
        }
    });
};

/**
 * Update an program
 */
exports.update = function(req, res) {
    var program = req.program;
    program.user = req.user;
    program = _.extend(program, req.body);

    program.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                program: program
            });
        } else {
            res.jsonp(program);
        }
    });
};

/**
 * Delete an program
 */
exports.destroy = function(req, res) {
    var program = req.program;

    program.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                program: program
            });
        } else {
            res.jsonp(program);
        }
    });
};

/**
 * Show an program
 */
exports.show = function(req, res) {
    res.jsonp(req.program);
};

/**
 * List of Programs
 */
exports.all = function(req, res) {
    Program.find().sort('-created').populate('user', 'name username').populate('rating').populate('-rating.rates').exec(function(err, programs) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(programs);
        }
    });
};