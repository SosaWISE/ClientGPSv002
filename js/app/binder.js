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
		ids = config.ViewIds,

		_bind = function () {
			ko.applyBindings(vm.Login, getView(ids.LoginView));
			ko.applyBindings(vm.Home, getView(ids.HomeView));
			//ko.applyBindings(vm.Register, getView(ids.RegisterView));
		},

		getView = function (viewName) {
			return $(viewName).get(0);
		};

	return {
		Bind: _bind
	};
});