angular.module('workout.timer', [])
  .directive('timer', [

    function() {
      
      return {
        replace: true,
        template: "<div class='timer'>" +
          "<span class='label'>Time left: </span>" +
          "<span class='time {{timerColor()}}' ng-class='{hidden:!isVisible}'>{{timeLeft}}</span>" +
          "</div>",
        scope: {
          countdownTime: '='
        },
        // controller: ['$scope', '$element', '$attrs', '$interval',
        //   function($scope, $element, $attrs, $interval) {
            
        //     $scope.blink = function() {
        //       $interval(function() {
        //         $scope.isVisible = !$scope.isVisible;
        //       }, 100);
        //     }
            
        //     $scope.on = function() {
        //       var iPromise = $interval(function() {
        //         $scope.timeLeft -= 1;
        //         if ($scope.timeLeft <= 0) {
        //           $interval.cancel(iPromise);
        //           $scope.blink();
        //         }
        //       }, 1000, $scope.on);

        //     }
        //   }
        // ],
        link: function($scope, $element, $attrs) {
          $scope.timeLeft = $scope.countdownTime;
          $scope.isVisible = true;
          
          $scope.timerColor = function() {
            if ($scope.timeLeft / $scope.countdownTime > 0.5) {
              return "green";
            } else if ($scope.timeLeft / $scope.countdownTime > 0.3) {
              return "yellow";
            } else {
              return "red";
            }
          }

          $scope.on();
        }
      }
    }
  ]);