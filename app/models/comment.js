'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.SchemaTypes.ObjectId;

/**
 * Ratin gSchema
 */
var CommentSchema = new Schema({
    user: {
        type : Schema.ObjectId, ref : 'User'
    },
    comment: { type : String }
});

mongoose.model('Comment', CommentSchema);