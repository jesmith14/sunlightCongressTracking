'use strict';

//Setting up route
angular.module('senators').config(['$stateProvider',
	function($stateProvider) {
		// Senators state routing
		$stateProvider.
		state('listSenators', {
			url: '/senators',
			templateUrl: 'modules/senators/views/list-senators.client.view.html'
		}).
		state('createSenator', {
			url: '/senators/create',
			templateUrl: 'modules/senators/views/create-senator.client.view.html'
		}).
		state('viewSenator', {
			url: '/senators/:senatorId',
			templateUrl: 'modules/senators/views/view-senator.client.view.html'
		}).
		state('editSenator', {
			url: '/senators/:senatorId/edit',
			templateUrl: 'modules/senators/views/edit-senator.client.view.html'
		});
	}
]);