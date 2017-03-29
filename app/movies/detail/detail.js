(function () {
	'use strict'

	// set route config
	angular
		.module('myApp.movies.detail', ['ngRoute', 'myApp.movies'])
		.config(config);

	function config($routeProvider) {
		$routeProvider.when('/movies/:id', {
	    	templateUrl: 'movies/detail/detail.html',
			controller: 'MovieDetailCtrl',
			controllerAs: 'md'
	  	});
	}

	// controller
	angular
		.module('myApp.movies.detail')
		.controller('MovieDetailCtrl', MovieDetailCtrl);

	// inject movie service
	MovieDetailCtrl.$inject = ['$routeParams', 'movieService', 'APICONFIG'];
	function MovieDetailCtrl($routeParams, movieService, APICONFIG) {
		var vm = this;
		// initialize variables
		vm.detail 	 = [];
		// set api config
		vm.APICONFIG = APICONFIG;

		// run activate
		activate();

		console.log(vm);
		// initial list
		function activate() {
			// initial listing of latest movies
			return movieService.detail($routeParams.id).then(function(data) {
				// set results
	            vm.detail = data;
	            // return results
	            return vm;
	        });
		}
	}
})();