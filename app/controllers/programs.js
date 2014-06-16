'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Program = mongoose.model('Program'), 
    Rating = mongoose.model('Rating'), 
    Comment = mongoose.model('Comment'), 
    _ = require('lodash');


/**
 * Find program by id
 */
exports.program = function(req, res, next, id) {
    Program.findOne({_id: id}).populate('comments')
                              .populate('exercises.exercise')
                              .populate('user', 'name username')
                              .populate('rating')
                              .populate('rating._id')
                              .populate('-rating.rates')
                              .exec(function(err, program) {
        

        if (err)
            return next(err);

        if (!program)
            return next(new Error('Failed to load program ' + id));

        var options = {
            path: 'comments.user',
            model: 'User'
        };

        Program.populate(program, options, function(err, program){
            req.program = program;
            next();
        });
    });
};

/**
 * Create an program
 */
exports.create = function(req, res) {
    var rating = new Rating();
    rating.rates = [];
    rating.save();
    var program = new Program(req.body);
    program.user = req.user;
    program.rating = rating._id;

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

exports.comment = function(req, res) {
    var id = req.program._id;
    var content = req.body.content;

    var comment = new Comment();
    comment.user = req.user;
    comment.comment = content;

    comment.save();

    Program.findOne({_id: id}).populate('comments').populate('exercises.exercise').populate('user', 'name username').populate('rating').populate('-rating.rates').exec(function(err, program) {
        program.comments.push(comment._id);
        program.save();
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