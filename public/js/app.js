'use strict';

angular.module('workout', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'workout.system', 'workout.programs', 'workout.exercises']);

angular.module('workout.system', []);
angular.module('workout.programs', []);
angular.module('workout.exercises', []);