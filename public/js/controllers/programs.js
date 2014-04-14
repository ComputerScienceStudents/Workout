'use strict';

angular.module('workout.programs').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Global', 'ProgramsService', function ($scope, $stateParams, $location, Global, ProgramsService) {

    $scope.create = function(){
        //$scope.program = new Program();
    }

    $scope.remove = function(){

    }

    $scope.edit = function(){

    }

    $scope.findOne = function () {
        
        //mock
        $scope.program = {
            title: "ABS",
            lead: "Chcesz mieć kaloryfer?",
            description: "Zestaw ćwiczeń na mięśnie brzucha. Dzięki temu treningowi pozbędziesz się zbędnych kilogramów",
            excercises: [
                {
                    title: "Crunch",
                    repetitions: 12,
                    minature: "http://www.netfit.co.uk/public/images/assets/160.jpg"
                },
                {
                    pause: 25
                },
                {
                    title: "Leg raise",
                    length: 12,
                    minature: "http://www.netfit.co.uk/public/images/assets/160.jpg"
                },
                {
                    pause: 25
                },
                {
                    title: "Russian twist",
                    repetitions: 12,
                    minature: "http://www.netfit.co.uk/public/images/assets/160.jpg"
                },
                {
                    pause: 25
                },
                {
                    title: "Knee raise",
                    length: 12,
                    minature: "http://www.netfit.co.uk/public/images/assets/160.jpg"
                },
                {
                    pause: 25
                },
                {
                    title: "Side crunch",
                    repetitions: 12,
                    minature: "http://www.netfit.co.uk/public/images/assets/160.jpg"
                },
                {
                    pause: 25
                },
                {
                    title: "Sit-ups",
                    repetitions: 12,
                    minature: "http://www.netfit.co.uk/public/images/assets/160.jpg"
                },
                {
                    pause: 25
                },
                {
                    title: "Hip raise",
                    length: 12,
                    minature: "http://www.netfit.co.uk/public/images/assets/160.jpg"
                },
                {
                    pause: 25
                },
                {
                    title: "Knee raise",
                    length: 12,
                    minature: "http://www.netfit.co.uk/public/images/assets/160.jpg"
                },
                {
                    pause: 25
                },
                {
                    title: "Reverse crunch",
                    repetitions: 12,
                    minature: "http://www.netfit.co.uk/public/images/assets/160.jpg"
                }
            ]
        };
    }

    $scope.list = function () {
        $scope.programsTest = ProgramsService.query();
    }
}]);