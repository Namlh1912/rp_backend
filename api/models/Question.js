module.exports = {
	tableName: 'questions',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		description: {
			type: 'string',
			required: true
		},
		questionType: {
			type: 'string',
			required: true
		},
		surveyId: {
			type: 'integer',
			required: true
		},
		answer: {
			type: 'string'
		},
		status: {
			type: 'boolean',
			required: true
		}
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}
