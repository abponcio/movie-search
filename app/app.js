(function() {
	'use strict';

	angular.module('myApp', [
	  'ngRoute',
	  'myApp.view1',
	  'myApp.view2',
	  'myApp.movies',
	  'myApp.version',
	  'ui.bootstrap'
	]);

	// set global constants
	angular
		.module('myApp')
		.constant('APICONFIG', {
	        api_url: 'https://api.themoviedb.org/3',
	        api_key: '90094b557825824fc61427a0121c81fb',
	        base_url: 'http://image.tmdb.org/t/p/'
	    });

	// set global config
	angular
		.module('myApp')
		.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	  
	  $locationProvider.hashPrefix('!');
	  $routeProvider.otherwise({redirectTo: '/movies'});
	}]);

	angular
		.module('myApp')
		.controller('CollapsedMenuController', CollapsedMenuController);

	function CollapsedMenuController() {
		var vm = this;

		vm.isNavCollapsed = false;
		vm.isCollapsed = true;
		vm.isCollapsedHorizontal = true;
	}
})()
