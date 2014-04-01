'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Program Schema
 */
var ProgramSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
ProgramSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

mongoose.model('Program', ProgramSchema);