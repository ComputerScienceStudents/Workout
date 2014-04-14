'use strict';

angular.module('workout.programs').service('ProgramsService', ['$resource',
	function($resource){
		return $resource('/programs/:id', {}, {
			query: {method:'GET', params: {}, isArray:true}
		})
;	}
]);
