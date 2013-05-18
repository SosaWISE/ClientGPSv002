/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/17/13
 * Time: 6:14 PM
 * To change this template use File | Settings | File Templates.
 */
define('mock/mock',
[
	'mock/mock.generator',
	'mock/mock.session',
	'mock/mock.customer'
],
function (generator, session, customer) {
	var
		model = generator. model,

		_dataServiceInit = function () {
			session.defineApi(model);
			customer.defineApi(model);
		};

	/** Return object. */
	return {
		get DataServiceInit() { return _dataServiceInit }
	};
});