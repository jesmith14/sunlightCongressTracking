'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var senators = require('../../app/controllers/senators');

	// Senators Routes
	app.route('/senators')
		.get(senators.list)
		.post(users.requiresLogin, senators.create);

	app.route('/senators/:senatorId')
		.get(senators.read)
		.put(users.requiresLogin, senators.hasAuthorization, senators.update)
		.delete(users.requiresLogin, senators.hasAuthorization, senators.delete);

	// Finish by binding the Senator middleware
	app.param('senatorId', senators.senatorByID);
};