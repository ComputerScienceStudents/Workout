'use strict';

angular.module('workout.workoutMode').service('Stats', ['$resource',
	function($resource) {
		return $resource('statistics/:statsId', {
			ratingId: "@statsId"
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);