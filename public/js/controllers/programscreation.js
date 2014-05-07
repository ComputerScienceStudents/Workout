'use strict';

angular.module('workout.programscreation').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Global', 'Programs', function ($scope, $stateParams, $location, Global, Programs) {

    $scope.create = function() {
        var program = new Programs({
            title: this.title,
            description: this.description,
            lead: this.lead,
            exercise: []
        });
        
        program.$save(function(response) {
            $location.path('programs/' + response._id);
        });

        this.title = '';
        this.description = '';
        this.lead = '';
    };
    
}]);
