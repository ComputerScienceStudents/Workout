'use strict';

angular.module('workout.programs').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs', function ($scope, $stateParams, $location, Global, Programs) {

    $scope.create = function(){
        //$scope.program = new Program();
    };

    $scope.remove = function(){

    };

    $scope.edit = function(){

    };

    $scope.findOne = function () {
        Programs.get({
            programId: $stateParams.programId
        }, function(program) {
            $scope.program = program;
        });
            
    };

    $scope.find = function () {
        Programs.query(function(programs) {
            $scope.programs = programs;
        });
    };
}]);