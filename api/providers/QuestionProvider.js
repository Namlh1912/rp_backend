const QuestionRepository = require('../repositories/QuestionRepository');

class CategoryProvider {

	constructor() {

	}

	get questionRepo() {
		if (!this._repo) {
			this._repo = new QuestionRepository();
		}
		return this._repo;
	}

	create(data) {
		return this.questionRepo.create(data);
	}

	update(data) {
		return this.questionRepo.findOrCreate(data).then(question => {
			if (question) {
				return this.questionRepo.update(data);
			}
		}).then(updated => updated);
	}
}

module.exports = CategoryProvider;