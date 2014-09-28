'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('MainCtrl', ['$scope', 'ZapposApi', 'Categories',
    function($scope, ZapposApi, Categories) {
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

        $scope.submit = function() {
            angular.forEach($scope.items, function(value, key) {
                if (!value.category) {
                    value.category = Categories.get();
                }
            });

            loadItems($scope.cost);
        }

        function loadItems(cost) {
            var count = $scope.items.length;
            var meanCost = Math.round(cost / count);

            if ($scope.items.length != 1){
                var randomCost = Math.round(Math.random() * meanCost);
            }
            else{
                var randomCost = meanCost;
            }
            
            var restMoney = meanCost - randomCost;
            searchItem(0, meanCost, randomCost, restMoney);

        }

        function searchItem(index, meanCost, cost, restMoney) {
            if (index == $scope.items.length) {
                return;
            }

            ZapposApi.search($scope.items[index].category, cost)
                .then(function(res) {
                    var results = res.data.results;
                    if (results.length == 0){
                        searchItem(index, meanCost, cost + 1, restMoney - 1);
                    }
                    else{
                        $scope.items[index].result = results[0];
                        var randomCost = meanCost + restMoney;
                        restMoney = 0;
                        searchItem(index + 1, meanCost, randomCost, restMoney);
                        console.log($scope.items)
                    }
                })
        }
    }
]);