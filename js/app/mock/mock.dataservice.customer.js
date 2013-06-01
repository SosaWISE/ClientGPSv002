/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 11:19 AM
 * To change this template use File | Settings | File Templates.
 */
define('mock/mock.dataservice.customer',
['amplify'],
function (amplify) {
	var
		_defineApi = function (model) {
			amplify.request.define('customer-auth', function (settings) {
				settings.success(model.CustomerAuth());
			});
		};

	return {
		get DefineApi() { return _defineApi; }
	};
});