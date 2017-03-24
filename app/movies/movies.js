(function () {
	'use strict'

	// set route config
	angular
		.module('myApp.movies', ['ngRoute'])
		.config(config);

	function config($routeProvider) {
		$routeProvider.when('/movies', {
	    	templateUrl: 'movies/movies.html',
			controller: 'MovieCtrl',
			controllerAs: 'mc'
	  	});
	}

	// controller
	angular
		.module('myApp.movies')
		.controller('MovieCtrl', MovieCtrl);

	// inject movie service
	MovieCtrl.$inject = ['movieService'];
	function MovieCtrl(movieService) {
		var vm = this;
		// initialize variables
		vm.movies = [];
		vm.pages  = 0;
		vm.total  = 0;
		vm.query  = '';

		// actions
		vm.search = search;

		// run activate
		activate();

		// initial list
		function activate() {
			// initial listing of latest movies
			return movieService.latest().then(function(data) {
				// set pages
				vm.pages  = data.total_pages;
				// set total results
				vm.total  = data.total_results;
				// set results
	            vm.movies = data.results;
	            return vm;
	        });
		}

		// search function
		function search(query) {
			console.log('dasd');
			// fetch from service search query
			return movieService.search(query).then(function(data) {
				// set pages
				vm.pages  = data.total_pages;
				// set total results
				vm.total  = data.total_results;
				// set results
	            vm.movies = data.results;
	            return vm;
	        });
		}
	}

	// movie service	
	angular
		.module('myApp.movies')
		.service('movieService', movieService);

	// inject
	movieService.$inject = ['$http', '$q', 'global'];
	function movieService($http, $q, global) {
		// set api url
		var apiUrl = global.api_url;
		// set api key
		var apiKey = global.api_key;
		// set functions
		var service = {
	        latest: latest,
	        search: search
	    };

	    return service;

		/////

		// list all latest movies from api
		function latest(page = 1) {
			// set request url
			var requestApi = apiUrl + '/movie/top_rated?api_key=' + apiKey + '&language=en-US&page=' + page;

			return $http
				.get(requestApi)
		        .then(searchMoviesComplete)
		        .catch(searchMoviesFailed);

		    function searchMoviesComplete(data, status, headers, config) {
		        return data.data;
		    }

		    function searchMoviesFailed(e) {
		        var newMessage = 'XHR Failed for getMovies'
		        if (e.data && e.data.description) {
		          newMessage = newMessage + '\n' + e.data.description;
		        }
		        e.data.description = newMessage;
		        logger.error(newMessage);
		        return $q.reject(e);
		    }
		}

		// search movies from api
		function search(query) {
			// set request url
			var requestApi = apiUrl + '/search/movie?api_key=' + apiKey + '&language=en-US&query=' + query;

			return $http
				.get(requestApi)
		        .then(searchMoviesComplete)
		        .catch(searchMoviesFailed);

		    function searchMoviesComplete(data, status, headers, config) {
		        return data.data;
		    }

		    function searchMoviesFailed(e) {
		        var newMessage = 'XHR Failed for getMovies'
		        if (e.data && e.data.description) {
		          newMessage = newMessage + '\n' + e.data.description;
		        }
		        e.data.description = newMessage;
		        logger.error(newMessage);
		        return $q.reject(e);
		    }
		}
	}
})();