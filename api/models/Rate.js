/**
 * Device.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'rates',
	attributes: {
		productId: {
			type: 'integer',
			required: true
		},
		customerId: {
			type: 'integer',
			required: true
		},
		rating: {
			type: 'float',
			required: true
		},
		feedback: {
			type: 'string',
			required: true
		}
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
};

