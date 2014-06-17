'use strict';

angular.module('workout.programs').service('WorkoutRatings', ['$resource',
	function($resource) {
		return $resource('workout_ratings/:programId/:value', {
			programId: "@programId",
			value: "@value"
		}, {
			'create': {
				method: 'PUT'
			},
			'show': {
				method: 'GET',
				params:{
					value: ''
				}
			}
		});
	}
]);