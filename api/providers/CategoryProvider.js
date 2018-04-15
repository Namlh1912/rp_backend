const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryProvider {

	constructor() {

	}

	get categoryRepo() {
		if (!this._repo) {
			this._repo = new CategoryRepository();
		}
		return this._repo;
	}

	create(data) {
		// data.status = 1;
		return this.categoryRepo.create(data);
	}

	delete(id) {
		return this.categoryRepo.remove(id);
	}

	detail(id) {
		return this.categoryRepo.getDetail(id);
	}

	list() {
		return this.categoryRepo.getList();
	}

	listByName(name) {
		return this.categoryRepo.getByName(name);
	}

	update(data) {
		return this.categoryRepo.getDetail(data.id).then(button => {
			if (button) {
				let index = { id: data.id };
				return this.categoryRepo.update(data, index);
			}
		}).then(updated => updated);
	}
}

module.exports = CategoryProvider;