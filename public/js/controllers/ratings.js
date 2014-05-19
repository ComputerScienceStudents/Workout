'use strict';

angular.module('workout.programs').controller('RatingsController', ['$scope', '$stateParams', '$location', 'Global', 'Ratings', function ($scope, $stateParams, $location, Global, Ratings) {

    $scope.create = function(){
        //$scope.program = new Program();
    };

    $scope.remove = function(){

    };

    $scope.edit = function(){

    };

    $scope.findOne = function () {
        Ratings.get({
            ratingId: $stateParams.programId
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