'use strict';

angular.module('workout.programs').service('Programs', ['$resource',
	function($resource) {
		return $resource('programs/:programId', {
			programId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);