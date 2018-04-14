const moment = require("moment");
const json2csv = require('json2csv').Parser;

const ProductProvider = require('../providers/ProductProvider');
const CustomerProvider = require('../providers/CustomerProvider');
const RateProvider = require('../providers/RateProvider');
const ControllerBase = require('./ControllerBase');
const Validator = require('../validator/validation');

// const SERVER = 'http://localhost:1337';

class OrderController extends ControllerBase {
	constructor() {
		super()
		this._exportedMethods = []
	}

	get rateProvider() {
		if (!this._rateProvider) {
			this._rateProvider = new RateProvider()
		}
		return this._rateProvider
	}

	get customerProvider() {
		if (!this._customerProvider) {
			this._customerProvider = new CustomerProvider()
		}
		return this._customerProvider
	}

	get validator() {
		if (!this._validator) {
			this._validator = new Validator();
		}
		return this._validator;
	}

	create(request, response) {
		const customer = request.body['customer'];
		// if (!customer) { return response.badRequest(`Missing field customer`); }
		let validateRes = this.validator.notEmpty(customer);
		if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }

		const rates = request.body['rates'];
		// if (!rates) { return response.badRequest(`Missing field rate`); }
		validateRes = this.validator.notEmpty(rates);
		if (!validateRes.result) { return response.badRequest(`Missing key ${validateRes.key}`) }

		this.customerProvider.create(customer).then(cus => {
			let rateProm = [];
			rates.forEach(el => {
				el.customerId = cus.id;
				rateProm.push(this.rateProvider.create(el));
			});
			return Promise.all(rateProm);
		}).then(() => {
			response.status(204);
			return response.send();
		}).catch(err => {
			sails.log.error(err);
			return response.serverError('Cannot create rate.');
		});
	}

	delete(request, response) { }

	detail(request, response) {
		// try {
		// 	let id = parseInt(request.param('id'), 10);
		// 	let [products, order] = await Promise.all([
		// 		this.orderDetailProvider.getByOrderId(id),
		// 		this.orderProvider.detail(id)
		// 	]);
		// 	if (order) {
		// 		let newProducts = products.map(product => {
		// 			delete product.orderId;
		// 			let quantity = product.quantity;
		// 			delete product.quantity;
		// 			return { product, quantity }
		// 		});
		// 		order.productOrders = newProducts;
		// 		return response.ok(order);
		// 	}
		// 	return response.notFound('Cannot find this order detail');
		// }
		// catch (err) {
		// 	sails.log.error(err);
		// 	return response.serverError('Cannot find this order detail');
		// }
	}

	getNow() {
		return moment().utc()
	}

	async list(request, response) {
		try {
			let list = await this.rateProvider.list();
			const fields = ['customer', 'product', 'rate', 'feedback'];
			const json2csvParser = new json2csv({ fields });
			let csv = json2csvParser.parse(list);

			return response.ok(csv);
		} catch (err) {
			sails.log.error(err);
			return response.serverError('Get csv list failed');
		}
	}

	getByrateId(request, response) {
		// try {
		// 	let rateId = request.param('id');
		// 	let [rate, orders] = await Promise.all([
		// 		this.rateProvider.detail(rateId)
		// 		, this.orderProvider.getByrateId(rateId)
		// 	]);
		// 	if (orders && orders.length) {
		// 		let orderProm = [];
		// 		orders.forEach(order => {
		// 			order.productOrders = [];
		// 			order.ratename = rate.name;
		// 			order.address = rate.address;
		// 			orderProm.push(this.orderDetailProvider.getByOrderId(order.id));
		// 		});
		// 		let products = await Promise.all(orderProm);
		// 		products.forEach(productArr => {
		// 			let [product] = productArr;
		// 			let index = product && orders.findIndex(el => el.id === product.orderId);
		// 			if (index >= 0) {
		// 				productArr.forEach(el => {
		// 					delete el.orderId;
		// 					let quantity = el.quantity;
		// 					delete el.quantity;
		// 					orders[index].productOrders.push({ product: el, quantity })
		// 				});
		// 			}
		// 		});
		// 		return response.ok(orders);
		// 	}
		// 	return response.notFound('Cannot find any orders');
		// }
		// catch (err) {
		// 	sails.log.error(err);
		// 	return response.serverError('Cannot find any orders');
		// }
	}

}

module.exports = new OrderController().exports()
