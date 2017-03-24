(function () {
	'use strict'

	// set route config
	angular
		.module('myApp.view1', ['ngRoute'])
		.config(config);

	function config($routeProvider) {
		$routeProvider.when('/view1', {
	    	templateUrl: 'view1/view1.html',
			controller: 'View1Ctrl',
			controllerAs: 'v1c'
	  	});
	}

	// controller
	angular
		.module('myApp.view1')
		.controller('View1Ctrl', View1Ctrl);

	function View1Ctrl() {
		var vm = this;
		vm.name = 'test';
	}
})();