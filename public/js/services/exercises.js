'use strict';

//Exercises service used for exercises REST endpoint
angular.module('workout.exercises').factory('Exercises', ['$resource', function($resource) {
    return $resource('exercises/:exerciseId', {
        exerciseId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);