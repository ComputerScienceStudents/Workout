'use strict';

angular.module('workout.workoutMode').service('Stats', ['$resource',
	function($resource) {
		return $resource('statistics/:statsId', {
			statsId: "@statsId",
			value: "@value"
		}, {
			'update': {
				method: 'PUT'
			}
		});
	}
]);