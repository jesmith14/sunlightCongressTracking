'use strict';

//Senators service used to communicate Senators REST endpoints
angular.module('senators').factory('Senators', ['$resource',
	function($resource) {
		return $resource('senators/:senatorId', { senatorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);