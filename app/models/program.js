'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.SchemaTypes.ObjectId;

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
    },

    excercises: [{type: ObjectId, ref: 'ExerciseSchema'}],
    
    lead: {
        type: String,
        default: '',
        trim: false
    },

    description: {
        type: String,
        default: '',
        trim: false
    }
});

/**
 * Validations
 */
ProgramSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

ProgramSchema.path('description').validate(function(title) {
    return description.length;
}, 'Description cannot be blank');

ProgramSchema.path('lead').validate(function(title) {
    return description.length;
}, 'Lead cannot be blank');

mongoose.model('Program', ProgramSchema);