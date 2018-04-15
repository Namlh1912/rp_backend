module.exports = {
	tableName: 'feedbacks',
	attributes: {
		feedback: {
			type: 'string',
			required: true
		},
		customerId: {
			type: 'integer'
		},
		categoryId: {
			type: 'integer',
			required: true
		}
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}