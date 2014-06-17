'use strict';

angular.module('workout.workoutMode').controller('WorkoutsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs', 'WorkoutRatings', function ($scope, $stateParams, $location, Global, Programs, WorkoutRatings, Stats) {

    $scope.global = Global;

    $scope.workoutState = "NOT_RUNNING";

    $scope.exercisePause = false;

    $scope.init  = function() {
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
    };

    $scope.next = function() {
        if($scope.program.exercises.length < $scope.currentExerciseIndex && $scope.exercisePause){
            $scope.workoutState = "DONE";
        } else {
            if($scope.currentExercise.pause !== undefined && !$scope.exercisePause){
                $scope.exercisePause = true;
            } else {
                $scope.exercisePause = false;
                $scope.currentExerciseIndex++;
            }
            $scope.currentExercise = $scope.program.exercises[$scope.currentExerciseIndex];       
        }
    };

    $scope.pause = function  () {
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
        var exercises = {};
        while($scope.program.exercises.length < $scope.currentExerciseIndex){
          $scope.currentExercise = $scope.program.exercises[$scope.currentExerciseIndex];

          if(!exercises[$scope.currentExercise.id]){
            if($scope.currentExercise.repetitions){
              exercises[$scope.currentExercise.id] = $scope.currentExercise.repetitions;
            }
            else{
              exercises[$scope.currentExercise.id] = $scope.currentExercise.lenght;
            }
          }
          else{
            if($scope.currentExercise.repetitions){
              exercises[$scope.currentExercise.id] = $scope.currentExercise.repetitions + exercises[$scope.currentExercise.id];
            }
            else{
              exercises[$scope.currentExercise.id] = $scope.currentExercise.lenght + exercises[$scope.currentExercise.id];
            }
          }
          $scope.currentExerciseIndex++;
        }
        
        //exercise should be a map of <exercise.id, exercise.repeats/length> pairs
        Stats.update(exercises);
    };

    $scope.exit = function() {
          $scope.update();
       $location.path("/");
    };
}]);