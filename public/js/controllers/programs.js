'use strict';

angular.module('workout.programs').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs','Exercises', 'Ratings', 'Comments', function ($scope, $stateParams, $location, Global, Programs, Exercises, Ratings, Comments) {
    $scope.global = Global;

    $scope.exercises = [];

    $scope.exercisesCache = [];

    $scope.userRate = 0;

    $scope.comment = '';

    var currentViewId = 0;

    $scope.$watch('program.rating.userRate', function(newValue, oldValue) {
        $scope.program.rating.userRate = newValue;
        var ratingId = $scope.program.rating._id;

        saveRatings(ratingId, newValue, function(){
            var rate = getRatings(ratingId, function(){
                console.log(rate.usersCount);
                console.log(rate.average);
                $scope.program.rating.average = rate.average;
                $scope.program.rating.usersCount = rate.usersCount;
            });
        });
    });

    $scope.create = function() {
        var program = new Programs({
            title: this.title,
            description: this.description,
            lead: this.lead,
            exercises: $scope.exercises.map(function(e) { 
                return {repetitions: e.repetitions, pause: e.pause, exercise: e.exercise};
            }),
            public: this.public
        });
        
        program.$save(function(response) {
            $location.path('programs/' + response._id);
        });

        this.title = '';
        this.description = '';
        this.lead = '';
        this.exercises = [];
        this.public = false;
    };

    $scope.update = function(){
        var program = new Programs({
            _id: $stateParams.programId,
            title: this.title,
            description: this.description,
            lead: this.lead,
            exercises: $scope.exercises.map(function(e) { 
                return {repetitions: e.repetitions, pause: e.pause, exercise: e.exercise};
            }),
            public: this.public
        });

        Programs.update(program);

        $location.path('programs/' + $stateParams.programId);
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
            $scope.public = program.public;
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
            $scope.program.rating = getRatings($scope.program.rating._id);
        });
    };

    $scope.find = function () {
        Programs.query(function(programs) {
            $scope.programs = programs;
            $scope.publicPrograms = [];
            for(var i=0;i<programs.length;i++){
                if(programs[i].public && (programs[i].user === null || programs[i].user.name === $scope.global.user.name) ){
                    $scope.publicPrograms.push(programs[i]);
                }
            }
        });
    };

    $scope.startWorkout = function() {
        if($scope.program !== undefined) {
            var id = $scope.program._id;
            $location.path( "/workout/"+id);
        } 
    };

    $scope.addComment = function() {
        Comments.update({
            programId: $stateParams.programId
        }, {
            content: $scope.comment
        });

        $scope.program.comments.push({
            user: $scope.global.user,
            comment: $scope.comment
        });

        $scope.comment = '';
    };

    //helpers
    function saveRatings(id, value, callback) {
        Ratings.update({
            ratingId: id,
            value: value
        }, function(){
            callback();
        });
    }

    function getRatings(id, callback) {
        return Ratings.show({
            ratingId: id
        }, function(){
            callback();
        });
    }
}]);