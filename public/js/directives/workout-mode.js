'use strict';

angular.module('workout.workoutMode')
  .directive('workoutMode', ['$stateParams', '$location', 'Global', 'Programs', 'Stats', 'WorkoutRatings',
      function($stateParams, $location, Global, Programs, Stats, WorkoutRatings) {
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

            $scope.create = function() {
              //loop iterating over all program's exercises, adding all of them together
              $scope.currentExerciseIndex = 0;
              var workout_stats = new Stats({
                exercises: []
              });

              $scope.exit = function(rate) {
                if (rate !== undefined && rate != -1) {
                  WorkoutRatings.create({
                    programId: $scope.program._id,
                    value: rate
                  }, function() {});
                }
                while ($scope.program.exercises.length > $scope.currentExerciseIndex) {
                  $scope.currentExercise = $scope.program.exercises[$scope.currentExerciseIndex];
                  var obj = $scope.currentExercise.exercise;
                  alert(obj._id);

                  if ($scope.currentExercise.repetitions) {
                    workout_stats.exercises.push({
                      exercise: obj._id,
                      value: $scope.currentExercise.repetitions
                    });
                  } else {
                    workout_stats.exercises.push({
                      exercise: obj._id,
                      value: $scope.currentExercise.length
                    });
                  }
                  $scope.currentExerciseIndex++;
                }



                workout_stats.$save(function() {
                  $location.path("/");
                });

                //exercise should be a map of <exercise.id, exercise.repetitions/length> pairs

              };
            }

            $scope.pause = function() {
              $scope.workoutState = "PAUSE";
            };

            $scope.resume = function() {
              $scope.workoutState = "RUNNING";
            };

            $scope.finish = function() {
              $scope.workoutState = "DONE";
            };

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

            $scope.exit = function() {
              $scope.create();
            };
            
          }
        }
      }
    ]);