'use strict';

angular.module('workout.programs').service('ProgramsService', ['$resource',
	function($resource){
		return $resource('/programs', {}, {
			query: {method:'GET', params: {}, isArray:true}
		});
	}
]);
