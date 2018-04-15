module.exports = {
	tableName: 'survey_details',
	attributes: {
		survey: {
			type: 'string',
			required: true
		},
		question: {
			type: 'string',
			required: true
		},
		customer: {
			type: 'string'
		},
		answer: {
			type: 'string',
			required: true
		}
	},
	autoCreatedAt: false,
	autoUpdatedAt: false
}