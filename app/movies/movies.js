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
	MovieCtrl.$inject = ['movieService', 'APICONFIG'];
	function MovieCtrl(movieService, APICONFIG) {
		var vm = this;
		// initialize variables
		vm.movies 	   = [];
		vm.pages  	   = 0;
		vm.total  	   = 0;
		vm.pageSize    = 20;
		vm.query  	   = '';
		vm.currentPage = 1;
		vm.APICONFIG = APICONFIG;
		// actions
		vm.search = search;

		// run activate
		activate();

		console.log(vm);
		// initial list
		function activate() {
			// initial listing of latest movies
			return movieService.latest(vm.currentPage).then(function(data) {
				// set pages
				vm.pages  = data.total_pages;
				// set total results
				vm.total  = data.total_results;
				// set results
	            vm.movies = data.results;
	            // return results
	            return vm;
	        });
		}

		// search function
		function search(query, currentPage) {
			// fetch from service search query
			return movieService.search(query, vm.currentPage).then(function(data) {
				// set pages
				vm.pages  = data.total_pages;
				// set total results
				vm.total  = data.total_results;
				// set results
	            vm.movies = data.results;
	            // return results
	            return vm;
	        });
		}
	}

	// movie service	
	angular
		.module('myApp.movies')
		.service('movieService', movieService);

	// inject
	movieService.$inject = ['$http', '$q', 'APICONFIG'];
	function movieService($http, $q, APICONFIG) {
		// set api url
		var apiUrl = APICONFIG.api_url;
		// set api key
		var apiKey = APICONFIG.api_key;
		// set functions
		var service = {
	        latest: latest,
	        search: search,
	        detail: detail
	    };

	    return service;

		/////

		// list all latest movies from api
		function latest(page) {
			// set request url
			var requestApi = apiUrl + '/movie/popular?api_key=' + apiKey + '&language=en-US&page=' + page;

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
		function search(query, page) {
			// set request url
			var requestApi = apiUrl + '/search/movie?api_key=' + apiKey + '&language=en-US&query=' + query + 'page=' + page;

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
		function detail(id) {
			// set request url
			var requestApi = apiUrl + '/movie/' + id + '?api_key=' + apiKey;

			return $http
				.get(requestApi)
		        .then(detailMoviesComplete)
		        .catch(detailMoviesFailed);

		    function detailMoviesComplete(data, status, headers, config) {
		        return data.data;
		    }

		    function detailMoviesFailed(e) {
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