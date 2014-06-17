'use strict';

angular.module('workout.stats').controller('StatsController', ['$scope', '$stateParams', 'Global', 'Stats', 'Exercises', function ($scope, $stateParams, Global, Stats, Exercises) {
    
    var username = Global.user.username;

    // nobody will see
    function getWeekNumber(date){
        var d = new Date(+date);
        d.setHours(0,0,0);
        d.setDate(d.getDate()+4-(d.getDay()||7));
        return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
    };

    function mapStatsHistory(workouts) {
        var stats = {};
        for (var i = 0; i < workouts.length; i++) {
            mapWorkoutStats(workouts[i], stats);
        };
        return stats;
    }

    function mapWorkoutStats(workout, stats) {
        for (var i = 0; i < workout.exercises.length; i++) {
            var exercise = mapExerciseName(workout.exercises[i].exercise);
            if(!(exercise in stats)) {
                stats[exercise] = {};
            }
            stats[exercise][workout.created] = workout.exercises[i].value;
        };
    }

    function mapExerciseName(id) {
        return $scope.exercises.filter(function(e) { return e._id === id; })[0].title;
    }

    function mapToCharst(stats, chartConfig) {
        var mapped = []
        for(var exercise in stats) {
            mapped.push(chartConfig(stats[exercise], exercise));
        }
        return mapped;
    }

    function avg(numbers) {
        var sum = 0;
        for (var i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        };
        return sum/numbers.length;
    }

    function chartConfig(stats, exerciseName) {
        var data = [];
        for(var date in stats) {
            data.push([Date.parse(date), stats[date]]);
        }

        var period = ' from ' + data[0][0] + ' to ' + data[data.length - 1][0];

        return {
            chart: {
                type: 'spline'
            },
            title: {
                text: exerciseName
            },
            subtitle: {
                text: exerciseName + period
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
                name: exerciseName,
                data: data
                }]
            };
    }

    function weekChartConfig(stats, exerciseName) {
        var data = {};
        for(var date in stats) {
            var week = getWeekNumber(Date.parse(date));
            if(!(week in data)) {
                data[week] = [];
            }
            data[week].push(stats[date]);
        }
        var chartData = [];
        for(var week in data) {
            chartData.push([week, avg(data[week])])
        }


        var period = ' from ';// + data[0][0] + ' to ' + data[data.length - 1][0];

        return {
            chart: {
                type: 'column',
            },
            title: {
                text: exerciseName
            },
            subtitle: {
                text: exerciseName + period
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
                    text: 'average number of repetitions'
                },
                min: 0
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
            },

            series: [{
                type: 'column',
                name: exerciseName,
                data: chartData
            }]
        };
    }

    $scope.initialize = function() {
        Exercises.query(function(exercises) {   
            $scope.exercises = exercises;         
            Stats.query(function(stats) {
                $scope.chartsConfig = mapToCharst(mapStatsHistory(stats), chartConfig);
                $scope.weeklyCharts = mapToCharst(mapStatsHistory(stats), weekChartConfig);
            });
        });
    }
}]);