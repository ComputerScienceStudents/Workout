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

    exercises: [{
        repetitions: {
            type: Number
        },
        pause: {
            type: Number
        },
        length: {
            type: Number
        },
        exercise: {
            type: ObjectId,
            ref: 'Exercise'
        }
    }],

    lead: {
        type: String,
        default: '',
        trim: false
    },

    description: {
        type: String,
        default: '',
        trim: false
    },
    rating: {
        type: ObjectId,
        ref: 'Rating'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    public: {
        type: Boolean
    }
});

/**
 * Validations
 */
ProgramSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

ProgramSchema.path('description').validate(function(description) {
    return description.length;
}, 'Description cannot be blank');

ProgramSchema.path('lead').validate(function(lead) {
    return lead.length;
}, 'Lead cannot be blank');


/**
 * Statics
 */
ProgramSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: mongoose.Types.ObjectId(id)
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Program', ProgramSchema);