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
    }).state('create exercise', {
        url: '/exercises/create',
        templateUrl: 'views/exercises/create.html'
    }).state('exercise details', {
        url: '/exercises/:exerciseId',
        templateUrl: 'views/exercises/details.html'
    })    
    .state('all programs', {
        url: '/programs',
        templateUrl: 'views/programs/list.html'
    })
    .state('program create', {
        url: '/programs/create', 
        templateUrl: 'views/programs/create.html'
    })
    .state('program details', {
        url: '/programs/:programId', 
        templateUrl: 'views/programs/details.html'
    })
    .state('program edit', {
        url: '/programs/:programId/edit', 
        templateUrl: 'views/programs/edit.html'
    })
    .state('Workout mode', 
    {
        url: '/workout', 
        templateUrl: 'views/workout/error.html'
    })
    .state('Specific workout mode', 
    {
        url: '/workout/:programId', 
        templateUrl: 'views/workout/workout.html'
    });
}]);

//Setting HTML5 Location Mode
angular.module('workout').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
