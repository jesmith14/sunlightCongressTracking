'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Senator Schema
 */
var SenatorSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Senator name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Senator', SenatorSchema);