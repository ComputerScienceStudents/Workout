'use strict';

angular.module('workout.workoutMode')
  .directive('workoutMode', ['$stateParams', '$location', 'Global', 'Programs','Stats',
    function($stateParams, $location, Global, Programs, Stats) {
      return {
        scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope) {
          $scope.global = Global;

          $scope.workoutState = "NOT_RUNNING";

          $scope.exercisePause = false;

          var init = function() {
            Programs.get({
              programId: $stateParams.programId
            }, function(program) {
              $scope.program = program;
            });
          };

          init();
        },
        templateUrl: 'templates/workoutTemplate.html',
        replace: true,
        link: function($scope) {

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

          $scope.create = function(){
            //loop iterating over all program's exercises, adding all of them together
            $scope.currentExerciseIndex = 0;
            var workout_stats = new Stats({
              exercises: []
            });

            while($scope.program.exercises.length > $scope.currentExerciseIndex){
              $scope.currentExercise = $scope.program.exercises[$scope.currentExerciseIndex];
              var obj = $scope.currentExercise.exercise;
              alert(obj._id);

              if($scope.currentExercise.repetitions){
                workout_stats.exercises.push({
                  exercise: obj._id,
                  value: $scope.currentExercise.repetitions
                });
              }
              else{
                workout_stats.exercises.push({
                  exercise: obj._id,
                  value: $scope.currentExercise.length
                });
              }
              $scope.currentExerciseIndex++;
            }

            

            workout_stats.$save(function(){
              $location.path("/");
            });

            //exercise should be a map of <exercise.id, exercise.repetitions/length> pairs
            
          };

          $scope.exit = function() {
            $scope.create();
          };
        }
      };
    }
  ]);