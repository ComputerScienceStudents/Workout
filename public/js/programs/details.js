angular.module('workout.programs', [])

.directive('details', ['', function(){
	// Runs during compile
	return {
		scope: {
			program:'='
		},
		templateUrl: '',
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}]);