module.exports = {
	tableName: 'customers',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		name: {
			type: 'string'
		},
		email: {
			type: 'string'
		},
		phone: {
			type: 'string'
		},
		city: {
			type: 'string'
		},
		company: {
			type: 'string'
		},
		business: {
			type: 'string'
		},
		status: {
			type: 'boolean',
			defaultsTo: true
		}
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}