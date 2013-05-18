/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 5:35 PM
 * To change this template use File | Settings | File Templates.
 */
define('model',
	[
		'model.customer',
		'model.session'
	],
	function (customer, session) {
		var
			model = {
				Customer: customer
			};

		model.setDataContext = function (dc) {
			// Model's that have navigation properties
			// need a reference to the datacontext.
			model.Customer.datacontext(dc);
		};

		/** Return object. */
		return model;
	});