'use strict';

angular.module('workout.exercises').controller('ExercisesController', ['$scope', '$stateParams', '$location', 'Global', 'Exercises', function ($scope, $stateParams, $location, Global, Exercises) {
    $scope.global = Global;

    $scope.create = function() {
        var exercise = new Exercises({
            title: this.title,
            description: this.description,
            categories: this.categories.split(','), // to be improved in future
            video: this.video,
            minature: this.minature
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

    // helper method
    var getExercisesCategories = function(exercises) {
        var categories = {}, exerciseCategories;
        
        for (var exerciseId = 0; exerciseId < exercises.length; exerciseId++) {
            exerciseCategories = exercises[exerciseId].categories;
            for (var catId = 0; catId < exerciseCategories.length; catId++) {
                categories[exerciseCategories[catId]] = (exerciseCategories[catId] in categories) ? categories[exerciseCategories[catId]] + 1 : 1;
            }
        }

        var result = [{name: 'All', count: exercises.length}];
        for (var cat in categories) {
            result.push({name: cat, count: categories[cat]});
        }
        return result;
    };

    $scope.find = function() {
        Exercises.query(function(exercises) {
            $scope.exercises = exercises;
            $scope.categories = getExercisesCategories(exercises);
            $scope.currentCategory = 'All';
        });
    };

    $scope.findOne  = function() {
        Exercises.get({
            exerciseId: $stateParams.exerciseId
        }, function(exercise) {
            $scope.exercise = exercise;
        });
    };

    $scope.selectCategory = function(category) {
        Exercises.query(function(exercises) {
            $scope.exercises = exercises.filter(function(exercise) {
                return category === 'All' || exercise.categories.indexOf(category) !== -1;
            });
            $scope.categories = getExercisesCategories(exercises);
            $scope.currentCategory = category;
        });
    };
}]);