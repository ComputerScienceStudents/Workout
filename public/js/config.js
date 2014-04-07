'use strict';

//Setting up route
angular.module('workout').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    }).state('all exercises', {
        url: '/exercises',
        templateUrl: 'views/exercises/list.html'
    })
    .state('all programs', {
        url: '/programs',
        templateUrl: 'views/programs/programs.html'
    })
    .state('program by id', {
        url: '/programs/:programId',
        templateUrl: 'views/programs/details.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('workout').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
