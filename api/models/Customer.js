module.exports = {
	tableName: 'customers',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		name: {
			type: 'string',
			required: true
		},
		email: {
			type: 'string',
			required: true
		},
		phone: {
			type: 'string',
			required: true
		},
		city: {
			type: 'string',
			required: true
		},
		company: {
			type: 'string',
			required: true
		},
		business: {
			type: 'string',
			required: true
		},
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}