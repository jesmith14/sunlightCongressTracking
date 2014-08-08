'use strict';

(function() {
	// Senators Controller Spec
	describe('Senators Controller Tests', function() {
		// Initialize global variables
		var SenatorsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Senators controller.
			SenatorsController = $controller('SenatorsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Senator object fetched from XHR', inject(function(Senators) {
			// Create sample Senator using the Senators service
			var sampleSenator = new Senators({
				name: 'New Senator'
			});

			// Create a sample Senators array that includes the new Senator
			var sampleSenators = [sampleSenator];

			// Set GET response
			$httpBackend.expectGET('senators').respond(sampleSenators);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.senators).toEqualData(sampleSenators);
		}));

		it('$scope.findOne() should create an array with one Senator object fetched from XHR using a senatorId URL parameter', inject(function(Senators) {
			// Define a sample Senator object
			var sampleSenator = new Senators({
				name: 'New Senator'
			});

			// Set the URL parameter
			$stateParams.senatorId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/senators\/([0-9a-fA-F]{24})$/).respond(sampleSenator);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.senator).toEqualData(sampleSenator);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Senators) {
			// Create a sample Senator object
			var sampleSenatorPostData = new Senators({
				name: 'New Senator'
			});

			// Create a sample Senator response
			var sampleSenatorResponse = new Senators({
				_id: '525cf20451979dea2c000001',
				name: 'New Senator'
			});

			// Fixture mock form input values
			scope.name = 'New Senator';

			// Set POST response
			$httpBackend.expectPOST('senators', sampleSenatorPostData).respond(sampleSenatorResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Senator was created
			expect($location.path()).toBe('/senators/' + sampleSenatorResponse._id);
		}));

		it('$scope.update() should update a valid Senator', inject(function(Senators) {
			// Define a sample Senator put data
			var sampleSenatorPutData = new Senators({
				_id: '525cf20451979dea2c000001',
				name: 'New Senator'
			});

			// Mock Senator in scope
			scope.senator = sampleSenatorPutData;

			// Set PUT response
			$httpBackend.expectPUT(/senators\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/senators/' + sampleSenatorPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid senatorId and remove the Senator from the scope', inject(function(Senators) {
			// Create new Senator object
			var sampleSenator = new Senators({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Senators array and include the Senator
			scope.senators = [sampleSenator];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/senators\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSenator);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.senators.length).toBe(0);
		}));
	});
}());