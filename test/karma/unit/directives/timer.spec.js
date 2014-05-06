'use strict';

(function() {	
    describe('Directives', function() {
    	describe('timer directive', function() {

            module('workout.timer');

            var scope,
                compile;

            beforeEach(inject(function($compile, $rootScope) {
                scope = $rootScope;
                compile = $compile;
            }));

            it("sets red color if no time left", function() {
                var element = compile('<div timer countdown-time="10"></div>')(scope);
                scope.$digest();

                scope.timeLeft = 0;

                expect(scope.timerColor()).toBe("red");
            });
    	});
    });
})();