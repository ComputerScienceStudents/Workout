'use strict';



angular.module('workout.system')

.controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);