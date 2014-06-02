'use strict';

angular.module('workout.programs').service('Comments', ['$resource',
	function($resource) {
		return $resource('programs/:programId/comment', {
			programId: "@programId"
		}, {
			'update': {
				method: 'PUT'
			}
		});
	}
]);