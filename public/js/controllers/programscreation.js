'use strict';

angular.module('workout.programscreation').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs', function ($scope, $stateParams, $location, Global, Programs) {

    $scope.global = Global;


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
}]);
