'use strict';

angular.module('workout.programs').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs','Exercises', function ($scope, $stateParams, $location, Global, Programs, Exercises) {
    
    $scope.exercises = [];

    $scope.create = function() {
        var program = new Programs({
            title: this.title,
            description: this.description,
            lead: this.lead,
            exercises: $scope.exercises
        });
        
        program.$save(function(response) {
            $location.path('programs/' + response._id);
        });

        this.title = '';
        this.description = '';
        this.lead = '';
        $scope.exercises = [];
    };

    $scope.addExercise = function(){
        console.log("addExercise here");
        var exId = db.exercises.findOne({title:this.exercise_title})._id;
        if (!exId) {
            return next(new Error('Failed to load exercise: ' + exercise_title));
        }else{
            var exercises = $scope.exercises;
            exercises.push({
                repetitions: this.repetitions,
                pause: this.pause,
                exercise: exId});
            $scope.exercises = exercises;

        }
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

    $scope.startWorkout = function() {
        if($scope.program !== undefined) {
            var id = $scope.program._id;
            $location.path( "/workout/"+id);
        } 
    };
}]);