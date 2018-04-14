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
		}
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}