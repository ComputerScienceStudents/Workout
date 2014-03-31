'use strict';

//Setting up route
angular.module('workout').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('workout').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
