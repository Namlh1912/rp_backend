const moment = require("moment");
const json2csv = require("json2csv").Parser;

const FeedbackProvider = require("../providers/FeedbackProvider");
const CustomerProvider = require("../providers/CustomerProvider");
const RateProvider = require("../providers/RateProvider");
const ControllerBase = require("./ControllerBase");
const Validator = require("../validator/validation");

// const SERVER = 'http://localhost:1337';

class OrderController extends ControllerBase {
  constructor() {
    super();
    this._exportedMethods = [];
  }

  get rateProvider() {
    if (!this._rateProvider) {
      this._rateProvider = new RateProvider();
    }
    return this._rateProvider;
  }

  get customerProvider() {
    if (!this._customerProvider) {
      this._customerProvider = new CustomerProvider();
    }
    return this._customerProvider;
  }

  get feedbackProvider() {
    if (!this._feedbackProvider) {
      this._feedbackProvider = new FeedbackProvider();
    }
    return this._feedbackProvider;
  }

  get validator() {
    if (!this._validator) {
      this._validator = new Validator();
    }
    return this._validator;
  }

  create(request, response) {
    const customer = request.body["customer"];
    // if (!customer) { return response.badRequest(`Missing field customer`); }
    // let validateRes = this.validator.notEmpty(customer);
    // if (!validateRes.result) {
    //   return response.badRequest(`Missing key ${validateRes.key}`);
    // }

    const rates = request.body["rates"];
    // if (!rates) { return response.badRequest(`Missing field rate`); }
    let validateRes = this.validator.notEmpty(rates);
    if (!validateRes.result) {
      return response.badRequest(`Missing key ${validateRes.key}`);
    }

    this.customerProvider
      .create(customer)
      .then(cus => {
        let rateProm = [];
        rates.forEach(el => {
          el.customerId = cus.id;
          rateProm.push(this.rateProvider.create(el));
        });
        const feedback = {
          customerId: cus.id,
          categoryId: request.body["categoryId"],
          feedback: request.body["feedback"] || ""
        };
        return Promise.all([
          Promise.all(rateProm),
          this.feedbackProvider.create(feedback)
        ]);
      })
      .then(() => {
        response.status(204);
        return response.send();
      })
      .catch(err => {
        sails.log.error(err);
        return response.serverError("Cannot create rate.");
      });
  }

  getNow() {
    return moment().utc();
  }

  async list(request, response) {
    try {
      let list = await this.rateProvider.list();
      const fields = [
        "customer",
        "email",
        "phone",
        "product",
        "rate",
        "feedback"
      ];
      const json2csvParser = new json2csv({ fields });
      let csv = json2csvParser.parse(list);

      return response.ok(csv);
    } catch (err) {
      sails.log.error(err);
      return response.serverError("Get csv list failed");
    }
  }
}

module.exports = new OrderController().exports();
