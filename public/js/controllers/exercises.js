'use strict';

angular.module('workout.exercises').controller('ExercisesController', ['$scope', '$stateParams', '$location', 'Global', 'Exercises', function ($scope, $stateParams, $location, Global, Exercises) {
    $scope.global = Global;

    $scope.create = function() {
        var exercise = new Exercises({
            title: this.title,
            content: this.content
        });
        exercise.$save(function(response) {
            $location.path('exercises/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(exercise) {
        if (exercise) {
            exercise.$remove();

            for (var i in $scope.exercises) {
                if ($scope.exercises[i] === exercise) {
                    $scope.exercises.splice(i, 1);
                }
            }
        }
        else {
            $scope.exercise.$remove();
            $location.path('exercises');
        }
    };

    $scope.update = function() {
        var exercise = $scope.exercise;
        if (!exercise.updated) {
            exercise.updated = [];
        }
        exercise.updated.push(new Date().getTime());

        exercise.$update(function() {
            $location.path('exercises/' + exercise._id);
        });
    };

    $scope.find = function() {
        Exercises.query(function(exercises) {
            $scope.exercises = exercises;
        });
        $scope.categories = [{name: 'All', count: 55}, {name: 'Biceps', count: 22}, {name: 'Abdominal', count: 44}, {name: 'Legs', count: 2}, {name: 'Stretching', count: 1}];
    };

    $scope.findOne  = function() {
        Exercises.get({
            exerciseId: $stateParams.exerciseId
        }, function(exercise) {
            $scope.exercise = exercise;
        });
    };
}]);