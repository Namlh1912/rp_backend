module.exports = {
	tableName: 'question_types',
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
	autoUpdatedAt: false
}