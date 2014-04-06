'use strict';

angular.module('workout.programs').controller('ProgramsListCtrl', function ($scope) {
    $scope.programs = [
        {'name': 'Pompa!'},
        {'name': 'Masa jest, teraz rzeźbić'},
        {'name': 'Dla staruszków'},
        {'name': 'Informatyk style'},
        {'name': 'Pełen hardkor'},
        {'name': 'Kokosowy koksu'}
    ];
});