'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment');

/**
 * Find comment by id
 */
exports.comment = function(req, res, next, id) {
    Comment.findOne({_id: id}).exec(function(err, comment) {
        if (err) return next(err);
        if (!comment) return next(new Error('Failed to load comment ' + id));
        req.comment = comment;
        next();
    });
};

/**
 * Create an comment
 */
exports.create = function(req, res) {
    var comment = new Comment(req.body);
    comment.user = req.user;

    comment.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                comment: comment
            });
        } else {
            res.jsonp(comment);
        }
    });
};

/**
 * Show an comment
 */
exports.show = function(req, res) {
    res.jsonp(req.comment);
};

/**
 * List of comments
 */
exports.all = function(req, res) {
    Comment.find().sort('-created').exec(function(err, comment) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(comment);
        }
    });
};