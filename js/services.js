'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
 .factory('ZapposApi', ['$http', function($http){
 	var url = "http://api.zappos.com/"
 	return {
 		autoComplete: function(category){
 			return $http.jsonp(url + "AutoComplete", {
 				params: {
 					term: category,
 					callback: 'JSON_CALLBACK'
 				}
 			});
 		}
 		
 	};
 }])
