/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'surveys',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		title: {
			type: 'string',
			required: true
		},
		status: {
			type: 'boolean',
			defaultsTo: true
		}
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
};

