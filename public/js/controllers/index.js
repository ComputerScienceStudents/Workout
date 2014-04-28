'use strict';

angular.module('workout.system', ['workout.timer']).controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);