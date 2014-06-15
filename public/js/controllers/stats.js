'use strict';

angular.module('workout.stats').controller('StatsController', ['$scope', '$stateParams', 'Global', 'Stats', 'Exercises', function ($scope, $stateParams, Global, Stats, Exercises) {
    
    var username = Global.user.username;

    function mapStatsHistory(workouts) {
        var stats = {};
        for (var i = 0; i < workouts.length; i++) {
            mapWorkoutStats(workouts[i], stats);
        };
        return stats;
    }

    function mapWorkoutStats(workout, stats) {
        for (var i = 0; i < workout.exercises.length; i++) {
            var exercise = mapExerciseName(workout.exercises[i]._id);
            if(!(exercise in stats)) {
                stats[exercise] = {};
            }
            stats[exercise][workout.created] = workout.exercises[i].value;
        };
    }

    function mapExerciseName(id) {
        return $scope.exercises.filter(function(e) { return e._id === id; })[0].title;
    }

    $scope.initialize = function() {
        Exercises.query(function(exercises) {   
            $scope.exercises = exercises;         
            Stats.query(function(stats) {
                $scope.stats = mapStatsHistory(stats);
            });
        });
    }

    $scope.chart0 = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Push-ups'
        },
        subtitle: {
            text: 'Push-ups from 27.09.1970 to 12.05.1971'
        },
        xAxis: {
            type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Number of repetitions'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },

        series: [{
            name: 'Push-ups',
                // Define the data points. All series have a dummy year
                // of 1970/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                data: [
                [Date.UTC(1970,  9, 27), 3   ],
                [Date.UTC(1970, 10, 10), 6 ],
                [Date.UTC(1970, 10, 18), 7 ],
                [Date.UTC(1970, 11,  2), 8 ],
                [Date.UTC(1970, 11,  9), 6 ],
                [Date.UTC(1970, 11, 16), 6 ],
                [Date.UTC(1970, 11, 28), 7],
                [Date.UTC(1971,  0,  1), 8],
                [Date.UTC(1971,  0,  8), 8],
                [Date.UTC(1971,  0, 12), 8],
                [Date.UTC(1971,  0, 27), 8],
                [Date.UTC(1971,  1, 10), 8],
                [Date.UTC(1971,  1, 18), 8],
                [Date.UTC(1971,  1, 24), 9],
                [Date.UTC(1971,  2,  4), 9],
                [Date.UTC(1971,  2, 11), 9],
                [Date.UTC(1971,  2, 15), 10],
                [Date.UTC(1971,  2, 25), 12],
                [Date.UTC(1971,  3,  2), 13],
                [Date.UTC(1971,  3,  6), 15],
                [Date.UTC(1971,  3, 13), 16 ],
                [Date.UTC(1971,  4,  3), 20 ],
                [Date.UTC(1971,  4, 26), 18 ],
                [Date.UTC(1971,  5,  9), 22],
                [Date.UTC(1971,  5, 12), 24 ]
                ]
            }]
        },

    $scope.chart1 = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Pull-ups'
        },
        subtitle: {
            text: 'Pull-ups from 18.09.1970 to 07.05.1971'
        },
        xAxis: {
            type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Number of repetitions'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },

        series: [{
                name: 'Pull-ups',
                data: [
                [Date.UTC(1970,  9, 18), 3   ],
                [Date.UTC(1970,  9, 26), 2 ],
                [Date.UTC(1970, 11,  1), 4],
                [Date.UTC(1970, 11, 11), 5],
                [Date.UTC(1970, 11, 25), 8],
                [Date.UTC(1971,  0,  8), 8],
                [Date.UTC(1971,  0, 15), 9],
                [Date.UTC(1971,  1,  1), 8],
                [Date.UTC(1971,  1,  8), 6],
                [Date.UTC(1971,  1, 21), 5 ],
                [Date.UTC(1971,  2, 12), 9],
                [Date.UTC(1971,  2, 25), 10 ],
                [Date.UTC(1971,  3,  4), 9],
                [Date.UTC(1971,  3,  9), 9],
                [Date.UTC(1971,  3, 13), 11],
                [Date.UTC(1971,  3, 19), 12 ],
                [Date.UTC(1971,  4, 25), 12 ],
                [Date.UTC(1971,  4, 31), 15],
                [Date.UTC(1971,  5,  7), 14 ]
                ]
            }]
        },

    $scope.chart2 = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Squats'
        },
        subtitle: {
            text: 'Squats from 18.09.1970 to 07.05.1971'
        },
        xAxis: {
            type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Number of repetitions'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },

        series: [{
                name: 'Squats',
                data: [
                [Date.UTC(1970,  9, 18), 20   ],
                [Date.UTC(1970,  9, 26), 22 ],
                [Date.UTC(1970, 11,  1), 24 ],
                [Date.UTC(1970, 11, 11), 26 ],
                [Date.UTC(1970, 11, 25), 30],
                [Date.UTC(1971,  0,  8), 38],
                [Date.UTC(1971,  0, 15), 38],
                [Date.UTC(1971,  1,  1), 38],
                [Date.UTC(1971,  1,  8), 48],
                [Date.UTC(1971,  1, 21), 50 ],
                [Date.UTC(1971,  2, 12), 40 ],
                [Date.UTC(1971,  2, 25), 44 ],
                [Date.UTC(1971,  3,  4), 52 ],
                [Date.UTC(1971,  3,  9), 61],
                [Date.UTC(1971,  3, 13), 50],
                [Date.UTC(1971,  3, 19), 40 ],
                [Date.UTC(1971,  4, 25), 30 ],
                [Date.UTC(1971,  4, 31), 35],
                [Date.UTC(1971,  5,  7), 20   ]
                ]
            }]
        }
    }]);