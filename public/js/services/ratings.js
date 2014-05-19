'use strict';

angular.module('workout.programs').service('Ratings', ['$resource',
	function($resource) {
		return $resource('ratings/:ratingId', {
			programId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);