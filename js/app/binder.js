/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 10:29 AM
 * To change this template use File | Settings | File Templates.
 */
define('binder',
['jquery', 'ko', 'config','vm'],
function ($, ko, config, vm) {
	var
		// ids = config.ViewIds,

		_bind = function () {
			ko.applyBindings(vm);
			// ko.applyBindings(vm.Login, getView(ids.LoginView));
			//ko.applyBindings(vm.Register, getView(ids.RegisterView));
		};
		// },
		//
		// getView = function (viewName) {
		// 	var result = $(viewName).get(0);
		// 	if (!result) {
		// 		throw new Error('No view for `' + viewName + '`');
		// 	}
		// 	return result;
		// };

	return {
		Bind: _bind
	};
});
