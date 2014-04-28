angular.module('workout.timer', [])
  .directive('timer', ['$compile', function ($compile) {
    return  {
      restrict: 'EAC',
      replace: false,
      templateUrl: 'timer.html'
      scope: {
        countdownTime: '='
      },
      controller: ['$scope', '$element', '$attrs', '$interval', function ($scope, $element, $attrs, $interval) {
        $scope.timeLeft = $scope.countdownTime;
        $scope.on = function() {
          $interval(function() {
            $scope.timeLeft -= 1;
          }, 1000, countdownTime);
        }
      }        
    };
  }]);