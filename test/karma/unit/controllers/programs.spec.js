'use strict';

(function() {	
    describe('MEAN controllers', function() {
    	describe('ProgramsController', function() {
            beforeEach(module('workout'));

            var ProgramsController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            beforeEach(inject(function($controller, $rootScope, _$stateParams_, _$location_, _$httpBackend_) {
                scope = $rootScope.$new();
                ProgramsController = $controller('ProgramsController', {
                    $scope: scope
                });
                $stateParams = _$stateParams_;
                $httpBackend = _$httpBackend_;
                $location = _$location_;
            }));

            describe('$scope.addExercise() method', function () {
            	
            	it('adds exercise to $scope.exercises', function() {
	                    
                        // arange
                        scope.repetitions = "10";
                        scope.breakTime = "60";
			            scope.exerciseName = { id: 0, text: "text", description: "description" };
                        scope.exercises = [];
                        
                        // act
	                    scope.addExercise();

                        // assert
                        expect(scope.exercises.length).toBe(1);
                	});

            	it('clears exercise part of form', function() {
                        // arange
                        scope.repetitions = "10";
                        scope.breakTime = "60";
                        scope.exerciseName = { id: 0, text: "text", description: "description" };
                        
                        // act
                        scope.addExercise();

                        // assert
                        expect(scope.repetitions).toEqual('');
                        expect(scope.breakTime).toEqual('');
                        expect(scope.exerciseName).toBeUndefined();
                	});
            });
            
    	});
    });
})();