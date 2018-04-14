module.exports = {
	tableName: 'categories',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		name: {
			type: 'string',
			required: true
		},
		status: 'boolean'
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}