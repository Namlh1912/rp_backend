module.exports = {
	tableName: 'survey_details',
	attributes: {
		surveyId: {
			type: 'integer',
			required: true
		},
		questionId: {
			type: 'integer',
			required: true
		},
		customerId: {
			type: 'integer',
			required: true
		},
		answer: {
			type: 'string',
			required: true
		}
	},
	autoCreatedAt: false,
	autoUpdatedAt: false
}