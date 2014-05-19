'use strict';

angular.module('workout', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'workout.system', 'workout.exercises', 'workout.programs', 'workout.timer', 'workout.workoutMode']);

angular.module('workout.system', []);
angular.module('workout.exercises', ['ui.select2']);
angular.module('workout.programs', ['ui.bootstrap', 'ui.sortable']);
angular.module('workout.programscreation', ['ui.bootstrap']);
angular.module('workout.workoutMode', ['ui.bootstrap']);
