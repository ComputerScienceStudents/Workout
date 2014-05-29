'use strict';

angular.module('workout.workoutMode')
  .directive('workoutMode', ['$stateParams', '$location', 'Global', 'Programs','Stats',
    function($stateParams, $location, Global, Programs) {
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

          $scope.update = function(){
            //loop iterating over all program's exercises, adding all of them together
            $scope.currentExerciseIndex = 0;
            $scope.exercises = {};
            while($scope.program.exercises.length < $scope.currentExerciseIndex){
              $scope.currentExercise = $scope.program.exercises[$scope.currentExerciseIndex];

              var tmp = $scope.currentExercise.exercise.title;

              if(!$scope.exercises[$scope.currentExercise.exercise]){
                if($scope.currentExercise.repetitions){
                  $scope.exercises.push({
                    tmp : $scope.currentExercise.repetitions
                  });
                }
                else{
                  $scope.exercises.push({
                    tmp : $scope.currentExercise.lenght
                  }); 
                }
              }
              else{
                if($scope.currentExercise.repetitions){
                  $scope.exercises.push({
                    tmp : $scope.currentExercise.repetitions+$scope.exercises[tmp]
                  });
                }
                else{
                  $scope.exercises.push({
                    tmp : $scope.currentExercise.lenght+$scope.exercises[tmp]
                  }); 
                }
              }
              $scope.currentExerciseIndex++;
            }

            Stats.update($scope.exercises);
          };

          $scope.exit = function() {
            $scope.update();
            $location.path("/");
          };
        }
      };
    }
  ]);