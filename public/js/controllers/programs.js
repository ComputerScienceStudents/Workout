'use strict';

angular.module('workout.programs').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs','Exercises', function ($scope, $stateParams, $location, Global, Programs, Exercises) {
    $scope.global = Global;

    $scope.exercises = [];

    $scope.exercisesCache = [];

    $scope.userRate = 1;

    var currentViewId = 0;

    $scope.create = function() {
        var program = new Programs({
            title: this.title,
            description: this.description,
            lead: this.lead,
            exercises: $scope.exercises.map(function(e) { 
                return {repetitions: e.repetitions, pause: e.pause, exercise: e.exercise};
            })
        });
        
        program.$save(function(response) {
            $location.path('programs/' + response._id);
        });

        this.title = '';
        this.description = '';
        this.lead = '';
        this.exercises = [];
    };

    $scope.update = function(){
        var program = new Programs({
            _id: $stateParams.programId,
            title: this.title,
            description: this.description,
            lead: this.lead,
            exercises: $scope.exercises.map(function(e) { 
                return {repetitions: e.repetitions, pause: e.pause, exercise: e.exercise};
            })
        });

        Programs.update(program);
    };

    $scope.loadExercisesCache = function() {
        Exercises.query(function(exercises) {
            $scope.exercisesCache = exercises;
        });
    };

    $scope.fillForUpdate = function() {
        Programs.get({programId: $stateParams.programId}, function(program) {
            $scope.title = program.title;
            $scope.lead = program.lead;
            $scope.description = program.description;
            for (var i = 0; i < program.exercises.length; i++) {
                var exercise = program.exercises[i].exercise;
                $scope.exercises.push({
                    repetitions: program.exercises[i].repetitions,
                    pause: program.exercises[i].pause,
                    exercise: exercise._id,
                    title: exercise.title,
                    description: exercise.description,
                    minature: exercise.minature,
                    viewId: currentViewId++
                });
            }
        });
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
        $scope.clearExerciseForm($scope);
    };

    $scope.clearExerciseForm = function(form) {
        form.repetitions = "";
        form.breakTime = "";
        form.exerciseName = undefined;
    };

    $scope.removeExercise = function(viewId) {
        $scope.exercises = $scope.exercises.filter(function(e) { return e.viewId !== viewId;});
    };

    function format(exercise) {
        return "<div><h4>" + exercise.text + "</h4>" + exercise.description + "<br/><img width='125' src='" + exercise.minature + "'/></div>";
    }

    $scope.select2Options = {
        query: function (query) {
            var results = $scope.exercisesCache
                .filter(function(e) { return e.title.indexOf(query.term) !== -1;})
                .map(function(e) {return {id: e._id, text: e.title, minature: e.minature, description: e.description};});
            query.callback({results: results});
        },
        formatResult: format,
        escapeMarkup: function(m) { return m; }
    };

    $scope.remove = function(){

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

    $scope.rateProgram = function() {

    }
}]);