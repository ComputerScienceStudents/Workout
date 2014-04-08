'use strict';

angular.module('workout.programs').controller('ProgramsListCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Programs',
		function($scope, $stateParams, $location, Global, Programs) {
			$scope.find = function() {
				Programs.query(function(programs) {
					$scope.programs = programs;
				});
			}}]);