/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your products directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/products/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `products`-- the default Gruntfile in Sails copies
 * flat files from `products` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

	/***************************************************************************
	*                                                                          *
	* Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
	* etc. depending on your default view engine) your home page.              *
	*                                                                          *
	* (Alternatively, remove this and add an `index.html` file in your         *
	* `products` directory)                                                      *
	*                                                                          *
	***************************************************************************/

	'/': {
		view: 'homepage'
	},

	/************* PRODUCTS ***************/
	'get /products': 'Product.list',
	'get /products/:id': 'Product.detail',
	'get /products/name/:name': 'Product.searchName',
	'post /products': 'Product.create',
	'patch /products': 'Product.update',
	'delete /products/:id': 'Product.delete',

	/************* RATES ***************/
	'get /rates': 'Rate.list',
	'post /rates': 'Rate.create',
	//   'get /order-products/:device_code': 'Order.orderProduct',
	//   'get /orders/:id': 'Order.detail',
	//   'get /user-orders/:id': 'Order.getByUserId',
	//   'get /subcribe-order-room': 'Order.subcribeToOrderRoom',
	//   'delete /orders/:id': 'Order.delete',

	/************* CATEGORIES ***************/
	'get /categories': 'Category.list',
	'get /categories/name/:name': 'Category.listByName',
	'post /categories': 'Category.create',
	'get /categories/:id': 'Category.detail',
	'patch /categories': 'Category.update',
	'delete /categories/:id': 'Category.delete',

	/************* USERS ***************/
	'post /login': 'User.login',
	'post /users': 'User.create',
	'get /users': 'User.list',
	'get /users/:id': 'User.detail',
	'patch /users': 'User.update',
	'delete /users/:id': 'User.delete',

	/************* SURVEYS ***************/
	'post /surveys': 'Survey.create',
	'get /surveys/:id': 'Survey.detail',
	'get /surveys': 'Survey.list',
	'get /surveys/name/:name': 'Survey.searchByName',
	'patch /surveys': 'Survey.update',
	'delete /surveys/:id': 'Survey.delete',

	/************* SURVEY DETAIL ***************/
	'post /surveys-detail': 'SurveyDetail.create',
	'get /surveys-detail': 'SurveyDetail.list',

	/************* FEDDBACK ***************/
	'get /feedbacks': 'Feedback.list'


	/***************************************************************************
	*                                                                          *
	* Custom routes here...                                                    *
	*                                                                          *
	* If a request to a URL doesn't match any of the custom routes above, it   *
	* is matched against Sails route blueprints. See `config/blueprints.js`    *
	* for configuration options and examples.                                  *
	*                                                                          *
	***************************************************************************/

};
