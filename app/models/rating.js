'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.SchemaTypes.ObjectId;

/**
 * Rating Schema
 */
var RatingSchema = new Schema({
    program: { type : Schema.ObjectId, ref : 'Program' },

    rates: [{
        user: {
            type : Schema.ObjectId, ref : 'User'
        },
        rate: {
            type: Number
        }
    }]
});

/**
 * Validations
 */
RatingSchema.path('program').validate(function(program) {
    return program.length;
}, 'Program cannot be blank');

/**
 * Statics
 */
RatingSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: mongoose.Types.ObjectId(id)
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Program', ProgramSchema);