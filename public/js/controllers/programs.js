'use strict';

angular.module('workout.programs').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs','Exercises', function ($scope, $stateParams, $location, Global, Programs, Exercises) {

    $scope.exercises = [];

    $scope.exercisesCache = [];

    var currentViewId = 0;

    $scope.loadExercisesCache = function() {
        Exercises.query(function(exercises) {
            $scope.exercisesCache = exercises;
        });
    };

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
        $scope.exercises.push({
            repetitions: $scope.repetitions,
            pause: $scope.breakTime,
            exercise: $scope.exerciseName.id,
            title: $scope.exerciseName.text,
            description: $scope.exerciseName.description,
            minature: $scope.exerciseName.minature,
            viewId: currentViewId++
        });
        $scope.clearExerciseForm();
    };

    $scope.clearExerciseForm = function() {
        $scope.repetitions = "";
        $scope.breakTime = "";
        $scope.exerciseName = undefined;
    }

    $scope.removeExercise = function(viewId) {
        $scope.exercises = $scope.exercises.filter(function(e) { return e.viewId !== viewId});
    };

    function format(exercise) {
        return "<div><h4>" + exercise.text + "</h4>" + exercise.description + "<br/><img width='125' src='" + exercise.minature + "'/></div>";
    };

    $scope.select2Options = {
        query: function (query) {
            var results = $scope.exercisesCache
                .filter(function(e) { return e.title.indexOf(query.term) !== -1})
                .map(function(e) {return {id: e._id, text: e.title, minature: e.minature, description: e.description}});
            query.callback({results: results});
        },
        formatResult: format,
        escapeMarkup: function(m) { return m; }
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