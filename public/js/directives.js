'use strict';

angular.module('workout').directive('wtYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<iframe width="640" height="390" class="col-md-12" ng-src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl(newVal);
           }
        });
    }
  };
});