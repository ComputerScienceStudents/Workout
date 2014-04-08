angular.module('workout.programs', []).
controller('ProgramDetailsCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Programs', function ($scope, $stateParams, $location, Global, Programs){
	// Programs.get({
 //            programId: $stateParams.programId
 //        }, function(program) {
 //            $scope.program = program;
 //        });

	$scope.program = {
		title: 'Program title',
		time:'2h15',
		details:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
		exercises:[
			{
				name:'push-ups',
				youtube:"FtcKhNzopTo",
				repetitions:10
			},
			{
				name:'push-ups',
				youtube:"FtcKhNzopTo",
				repetitions:10
			}
		]

	}
}]);