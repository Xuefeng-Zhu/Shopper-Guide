'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('MainCtrl', ['$scope', 'ZapposApi',
    function($scope, ZapposApi) {
        $scope.items = []

        $scope.$watch('quantity', function() {
            if ($scope.items.length < $scope.quantity) {
                var count = $scope.quantity - $scope.items.length
                for (var i = 0; i < count; i++) {
                    $scope.items.push({
                        category: ''
                    });
                }
            } else {
                $scope.items = $scope.items.slice(0, $scope.quantity);
            }
        });

        $scope.fetchCategories = function(category) {
            return ZapposApi.autoComplete(category)
                .then(function(res) {
                    return res.data.results;
                });
        }
    }
]);