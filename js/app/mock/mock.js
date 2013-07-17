/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/17/13
 * Time: 6:14 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'mock/mock.generator',
	'mock/mock.dataservice.session',
	'mock/mock.dataservice.customer'
],
function (generator, session, customer) {
	var
		model = generator. model,

		_dataServiceInit = function () {
			session.DefineApi(model);
			customer.DefineApi(model);
		};

	/** Return object. */
	return {
		init: function (config) {
			generator.init(config);
		},
		get DataServiceInit() { return _dataServiceInit; }
	};
});
