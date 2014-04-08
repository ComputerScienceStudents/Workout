'use strict';

angular.module('workout.programs').controller('ProgramsDetailsController', ['$scope', 'ProgramsService', function ($scope, ProgramsService) {
    $scope.programsTest = ProgramsService.query();
    
    $scope.programs = 
	[
	    {'name': 'Pompa!', '_id': 123},
        {'name': 'Masa jest, teraz rzeźbić', '_id': 456},
        {'name': 'Dla staruszków', '_id': 567},
        {'name': 'Informatyk style', '_id': 234},
        {'name': 'Pełen hardkor', '_id': 123344},
        {'name': 'Kokosowy koksu','_id': 324324}
    ];

     $scope.userPrograms = [
        {'name': 'Pompa!', '_id': 123},
        {'name': 'Masa jest, teraz rzeźbić', '_id': 456},
        {'name': 'Dla staruszków', '_id': 567}
    ];
}]);