'use strict';

angular.module('workout.programs').service('Ratings', ['$resource',
	function($resource) {
		return $resource('ratings/:ratingId/:value', {
			ratingId: "@ratingId",
			value: "@value"
		}, {
			'update': {
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