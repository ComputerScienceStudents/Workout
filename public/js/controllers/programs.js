'use strict';

angular.module('workout.programs').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs', function ($scope, $stateParams, $location, Global, Programs) {
    
    $scope.create = function() {
        var program = new Program({
            title: this.title,
            description: this.description,
            lead: this.lead
        });
        
        program.$save(function(response) {
            $location.path('programs/' + response._id);
        });

        this.title = '';
        this.description = '';
        this.lead = '';
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