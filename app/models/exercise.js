'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Exercise Schema
 */
var ExerciseSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    video: {
        type: String,
        default: '',
        trim: true
    },
    minature: {
        type: String,
        default: '',
        trim: true
    },
    categories: {
        type: Array,
        default: []
    }
});

/**
 * Validations
 */
ExerciseSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');


mongoose.model('Exercise', ExerciseSchema);