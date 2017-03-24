(function() {
	'use strict';

	angular.module('myApp', [
	  'ngRoute',
	  'myApp.view1',
	  'myApp.view2',
	  'myApp.movies',
	  'myApp.version'
	]);

	// set global constants
	angular
		.module('myApp')
		.constant('global', {
	        api_url: 'https://api.themoviedb.org/3',
	        api_key: '90094b557825824fc61427a0121c81fb'
	    });

	// set global config
	angular
		.module('myApp')
		.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	  
	  $locationProvider.hashPrefix('!');
	  $routeProvider.otherwise({redirectTo: '/view1'});
	}]);

})()
