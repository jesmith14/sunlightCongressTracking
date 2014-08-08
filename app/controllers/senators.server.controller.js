'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Senator = mongoose.model('Senator'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Senator already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Senator
 */
exports.create = function(req, res) {
	var senator = new Senator(req.body);
	senator.user = req.user;

	senator.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(senator);
		}
	});
};

/**
 * Show the current Senator
 */
exports.read = function(req, res) {
	res.jsonp(req.senator);
};

/**
 * Update a Senator
 */
exports.update = function(req, res) {
	var senator = req.senator ;

	senator = _.extend(senator , req.body);

	senator.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(senator);
		}
	});
};

/**
 * Delete an Senator
 */
exports.delete = function(req, res) {
	var senator = req.senator ;

	senator.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(senator);
		}
	});
};

/**
 * List of Senators
 */
exports.list = function(req, res) { Senator.find().sort('-created').populate('user', 'displayName').exec(function(err, senators) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(senators);
		}
	});
};

/**
 * Senator middleware
 */
exports.senatorByID = function(req, res, next, id) { Senator.findById(id).populate('user', 'displayName').exec(function(err, senator) {
		if (err) return next(err);
		if (! senator) return next(new Error('Failed to load Senator ' + id));
		req.senator = senator ;
		next();
	});
};

/**
 * Senator authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.senator.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};