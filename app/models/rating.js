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

    average: { type : Number}
});

/**
 * Statics
 */
RatingSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: mongoose.Types.ObjectId(id)
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Rating', RatingSchema);