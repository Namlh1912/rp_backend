const Bluebird = require('bluebird-global');

const SORT_STRING = 'id DESC';
const PRODUCT_STATUS = {
	available: 'available',
	unavailable: 'unavailable'
}

class ProductRepository {
	constructor() {
		this._ProductModel = Bluebird.promisifyAll(Product);
	}

	create(data) {
		return Product.create(data);
	}

	getList() {
		return Product.find({status: {'!': PRODUCT_STATUS.unavailable}}).sort(SORT_STRING);
	}

	getDetail(id) {
		return Product.findOne({ id: id });
	}

	getByCategory(categoryId) {
		return this._ProductModel.queryAsync(`
			select p.*, avg(r.rating) as rates from products p
			left outer join rates r on r.productId = p.id
			where p.categoryId = ${categoryId} group by p.id
		`, []);
	}

	remove(id) {
		return Product.destroy({ id: id });
	}

	update(index, data) {
		return Product.update(index, data);
	}

}

module.exports = ProductRepository;