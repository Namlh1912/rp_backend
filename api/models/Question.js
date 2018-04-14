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
			type: 'integer',
			required: true
		},
		surveyId: {
			type: 'integer',
			required: true
		},
		answer: {
			type: 'string',
			required: true
		}
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}
