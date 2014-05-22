'use strict';

(function() {	
    describe('MEAN controllers', function() {
    	describe('ExercisesController', function() {

            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            beforeEach(module('workout'));

            var ExercisesController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            beforeEach(inject(function($controller, $rootScope, _$stateParams_, _$location_, _$httpBackend_) {
                scope = $rootScope.$new();
                ExercisesController = $controller('ExercisesController', {
                    $scope: scope
                });
                $stateParams = _$stateParams_;
                $httpBackend = _$httpBackend_;
                $location = _$location_;
            }));

            // data for tests
            var formData = function() {
                return {
                    title: "push-ups",
		            description: "push-up",
		            categories: "chest",
		            video: "http://youtube.com/?v=kfldasjfkl",
		            minature: "http://doamin.com/min.png"
                };
            };
            
			var response = function() {
                return {
                	_id: "666",
                    title: "push-ups",
		            description: "push-up",
		            categories: "chest",
		            video: "http://youtube.com/?v=kfldasjfkl",
		            minature: "http://doamin.com/min.png"
                };
            };	

            describe('$scope.create() method', function () {
            	
            	it('sends proper POST request to RESTful service', function() {

	                    scope.title = "push-ups";
			            scope.description = "push-up";
			            scope.newCategories = "chest";
			            scope.video = "http://youtube.com/?v=kfldasjfkl";
			            scope.minature = "http://doamin.com/min.png";

	                    $httpBackend.expectPOST('exercises', formData()).respond(function() {return {};});

	                    scope.create();
	                    $httpBackend.flush();
                	});

            	it('clears form\'s data', function() {
	                    scope.title = "push-ups";
			            scope.description = "push-up";
			            scope.newCategories = "chest";
			            scope.video = "http://youtube.com/?v=kfldasjfkl";
			            scope.minature = "http://doamin.com/min.png";

	                    scope.create();
	                    
	                    expect(scope.title).toEqual('');
	                    expect(scope.description).toEqual('');
	                    expect(scope.newCategories).toEqual('');
	                    expect(scope.video).toEqual('');
	                    expect(scope.minature).toEqual('');
                	});

            	it('set location to exercises list', function() {
	                    scope.title = "push-ups";
			            scope.description = "push-up";
			            scope.newCategories = "chest";
			            scope.video = "http://youtube.com/?v=kfldasjfkl";
			            scope.minature = "http://doamin.com/min.png";

	                    $httpBackend.expectPOST('exercises', formData()).respond(response());

	                    scope.create();
	                    $httpBackend.flush();
	                    
	                    expect($location.path()).toBe('/exercises');
                	});
            });
            
    	});
    });
})();