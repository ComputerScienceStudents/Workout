'use strict';

angular.module('workout.system').factory('Program', ['$resource',
	function($resource){
		return $resource('/programs', {}, {
			query: {method:'GET', params: {}, isArray:true}
		});
	}
]);