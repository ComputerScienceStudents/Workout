'use strict';

angular.module('workout.programscreation').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs', function ($scope, $stateParams, $location, Global, Programs) {

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



    $scope.addexercise = function(){
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
    }
    
}]);
