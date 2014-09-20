'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
 .factory('ZapposApi', ['$http', function($http){
 	var url = "http://api.zappos.com/";
 	var key = "52ddafbe3ee659bad97fcce7c53592916a6bfd73";
 	return {
 		autoComplete: function(category){
 			return $http.jsonp(url + "AutoComplete", {
 				params: {
 					term: category,
 					callback: 'JSON_CALLBACK'
 				}
 			});
 		},
 		search: function(term, price){
 			return $http.jsonp(url + 'Search?term=' + term +
 					'&filters={"price":["' + parseFloat(price) + '.0"]}&sort={"recentSales":"desc"}&limit=1&callback=JSON_CALLBACK&key=' + key
 					)
 		}
 		
 	};
 }])
 .factory('Categories', [function(){
 	var categories = ["shoes", "clothing", "bags", "handgabs", "sneakers", "sandals", "jeans", "dresses"];
 	return {
 		get : function(){
 			return categories[Math.floor(Math.random() * categories.length)];
 		}
 	};
 }]);
