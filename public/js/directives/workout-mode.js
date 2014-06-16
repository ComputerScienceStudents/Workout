'use strict';

angular.module('workout.workoutMode')
  .directive('workoutMode', ['$stateParams', '$location', 'Global', 'Programs', 'WorkoutRatings',
    function($stateParams, $location, Global, Programs, WorkoutRatings) {
      return {
        scope: {}, // {} = isolate, true = child, false/undefined = no change
        templateUrl: 'templates/workoutTemplate.html',
        replace: true,
        link: function($scope) {

          $scope.global = Global;

          $scope.workoutState = "NOT_RUNNING";

          $scope.exercisePause = false;
          $scope.rate = -1;

          var init = function() {
            Programs.get({
              programId: $stateParams.programId
            }, function(program) {
              $scope.program = program;
            });
          };

          init();

          $scope.start = function() {
            $scope.workoutState = "RUNNING";
            $scope.currentExerciseIndex = 0;
            $scope.currentExercise = $scope.program.exercises[$scope.currentExerciseIndex];
          };

          $scope.next = function() {
            if ($scope.program.exercises.length <= $scope.currentExerciseIndex + 1) {
              $scope.workoutState = "DONE";
            } else {
              if ($scope.currentExercise.pause !== undefined && !$scope.exercisePause) {
                $scope.exercisePause = true;
              } else {
                $scope.exercisePause = false;
                $scope.currentExerciseIndex++;
              }
              $scope.currentExercise = $scope.program.exercises[$scope.currentExerciseIndex];
            }
          };

          $scope.pause = function() {
            $scope.workoutState = "PAUSE";
          };

          $scope.resume = function() {
            $scope.workoutState = "RUNNING";
          };

          $scope.finish = function() {
            $scope.workoutState = "DONE";
          };

          $scope.exit = function(rate) {
            if(rate !== undefined && rate != -1) {
              WorkoutRatings.create({
                  programId: $scope.program._id,
                  value: rate
              }, function(){});
            }
            $location.path("/");
          };
        }
      };
    }
  ]);