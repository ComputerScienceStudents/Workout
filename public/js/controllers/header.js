'use strict';

angular.module('workout.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Home',
        'link': ''
    }, {
        'title': 'Programs',
        'link': 'programs'
    }, {
        'title': 'Exercises',
        'link': 'exercises'
    }, {
        'title': 'Workout Mode',
        'link': 'workout'
    }];
    
    $scope.isCollapsed = false;
}]);