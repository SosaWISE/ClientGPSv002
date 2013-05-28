/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/18/13
 * Time: 11:15 AM
 * To change this template use File | Settings | File Templates.
 */
define('route-config',
['config', 'router', 'vm'],
function (config, router, vm) {
	var
		logger = config.Logger,

		_register = function () {

			var routeData = [
				// Home route
				{
					view: config.ViewIds.HomeView,
					routes: [
						{
							isDefault: true,
							route: config.Hashes.home,
							title: 'Home',
							callback: vm.Home.Activate,
							group: '.route-top'
						}
					]
				}
			];

			for (var i = 0; i < routeData.length; i++) {
				router.Register(routeData[i]);
			}

			/** Crank up the router. */
			router.Run();
		};

	/** Return object. */
	return {
		get Register() { return _register; }
	};
});