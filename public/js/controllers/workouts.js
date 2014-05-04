'use strict';

angular.module('workout.workoutMode').controller('WorkoutsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs', function ($scope, $stateParams, $location, Global, Programs) {
    $scope.global = Global;

    $scope.workoutState = "NOT_RUNNING";

    $scope.findOne  = function() {
        Programs.get({
            programId: $stateParams.programId
        }, function(program) {
            $scope.program = program;
        });
    };

    $scope.start = function() {
        $scope.workoutState = "RUNNING";
        $scope.currentExerciseIndex = 0;
        $scope.currentExercise = $scope.program.exercises[$scope.currentExerciseIndex];
    }

    $scope.next = function() {
        if($scope.program.exercises.length <= $scope.currentExerciseIndex+1){
            $scope.workoutState = "DONE";
        } else {
            $scope.currentExerciseIndex++;
        }
    }

    $scope.pause = function  () {
        $scope.workoutState = "PAUSE";
    }

    $scope.resume = function() {
        $scope.workoutState = "RUNNING";
    }

    $scope.finish = function() {
        $scope.workoutState = "DONE";
    }

    $scope.exit = function() {
        $location.path("/");
    }
}]);