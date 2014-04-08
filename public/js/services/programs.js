'use strict';

angular.module('workout.system').factory('Programs', ['$resource',
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