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
var RatingSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    workout: {
        type: ObjectId,
        ref: 'Program'
    },
    rate: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('WorkoutRating', RatingSchema);