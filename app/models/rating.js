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
    rates: [{
        user: {
            type : Schema.ObjectId, ref : 'User'
        },
        rate: {
            type: Number
        }
    }],

    average: { type : Number},
    usersCount: { type : Number}
});

mongoose.model('Rating', RatingSchema);