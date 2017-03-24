(function () {
	'use strict';

	// set route config
	angular
		.module('myApp.view2', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/view2', {
		    	templateUrl: 'view2/view2.html',
				controller: 'View2Ctrl as v2c'
		  	});
		}])

	// controller
	angular
		.module('myApp.view2')
		.controller('View2Ctrl', View2Ctrl);

	// controller methods
	function View2Ctrl() {
		var vm = this;
		vm.name = 'view2 test';
	}
})();