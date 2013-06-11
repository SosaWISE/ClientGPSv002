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
				},

				// Login route
				{
					view: config.ViewIds.LoginView,
					routes: [
						{
							route: config.Hashes.login,
							title: 'Login',
							callback: vm.Login.Activate,
							group: '.route-top'
						}
					]
				},

				{
					view: config.ViewIds.DevicesView,
					routes: [
						{
							route: config.Hashes.devices,
							title: 'Devices',
							callback: vm.Devices.Activate,
							group: '.route-top'
						}
					]
				},
				{
					view: config.ViewIds.UsersView,
					routes: [
						{
							route: config.Hashes.users,
							title: 'Users',
							callback: vm.Users.Activate,
							group: '.route-top'
						}
					]
				},
				{
					view: config.ViewIds.BillingView,
					routes: [
						{
							route: config.Hashes.billing,
							title: 'Billing',
							callback: vm.Billing.Activate,
							group: '.route-top'
						}
					]
				},
				{
					view: config.ViewIds.ReportView,
					routes: [
						{
							route: config.Hashes.reports,
							title: 'Reports',
							callback: vm.Reports.Activate,
							group: '.route-top'
						}
					]
				},
				{
					view: config.ViewIds.SettingsView,
					routes: [
						{
							route: config.Hashes.settings,
							title: 'Settings',
							callback: vm.Settings.Activate,
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
