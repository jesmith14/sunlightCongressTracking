'use strict';

// Senators controller
angular.module('senators').controller('SenatorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Senators',
	function($scope, $stateParams, $location, Authentication, Senators ) {
		$scope.authentication = Authentication;

		// Create new Senator
		$scope.create = function() {
			// Create new Senator object
			var senator = new Senators ({
				name: this.name
			});

			// Redirect after save
			senator.$save(function(response) {
				$location.path('senators/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Senator
		$scope.remove = function( senator ) {
			if ( senator ) { senator.$remove();

				for (var i in $scope.senators ) {
					if ($scope.senators [i] === senator ) {
						$scope.senators.splice(i, 1);
					}
				}
			} else {
				$scope.senator.$remove(function() {
					$location.path('senators');
				});
			}
		};

		// Update existing Senator
		$scope.update = function() {
			var senator = $scope.senator ;

			senator.$update(function() {
				$location.path('senators/' + senator._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Senators
		$scope.find = function() {
			$scope.senators = Senators.query();
		};

		// Find existing Senator
		$scope.findOne = function() {
			$scope.senator = Senators.get({ 
				senatorId: $stateParams.senatorId
			});
		};
	}
]);