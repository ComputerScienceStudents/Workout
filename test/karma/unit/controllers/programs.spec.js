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

            describe('$scope.removeExercise() method', function () {
                
                it('removes exercise with given viewId from $scope.exercises', function() {
                        
                        // arange
                        scope.exercises = [ {viewId: 1, description: "exercise #1"}, {viewId: 2, description: "exercise #2"} ];
                        
                        // act
                        scope.removeExercise(1);

                        // assert
                        expect(scope.exercises.length).toBe(1);
                    });
            });

            describe('$scope.update() method', function () {

                it('sets location to program view', function() {
                    var programId = "d92875j80d74897d29";
                    $stateParams.programId = programId;

                    scope.update();
                    
                    expect($location.path()).toBe('/programs/' + programId);
                });
            })
    	});
    });
})();