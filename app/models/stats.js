'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.SchemaTypes.ObjectId;

/**
 * Stats Schema
 */
var StatsSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },

    workouts: [{

        date: {
            type: Date,
            default: Date.now
        },

        exercises: [{
            
            value : {
                type: Number
            },

            exercise: {
                type: ObjectId,
                ref: 'Exercise'
            }
        }]
    }]
});



/**
 * Statics
 */
StatsSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: mongoose.Types.ObjectId(id)
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Stats', StatsSchema);