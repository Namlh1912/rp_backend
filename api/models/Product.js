/**
 * Image.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'products',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		name: {
			type: 'string',
			required: true
		},
		imgLink: {
			type: 'string',
			required: true
		},
		description: {
			type: 'string',
			required: true
		},
		categoryId: {
			type: 'integer',
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

