/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/14/13
 * Time: 1:47 PM
 * To change this template use File | Settings | File Templates.
 */
define('bootstrapper',
	['jquery','config', 'route-config', 'presenter', 'dataprimer', 'binder'],
	function ($, config, routeConfig, presenter, dataprimer, binder) {
		/** Initialize. */
		var
			_run = function () {
				console.log("Bootstrapping version: ", config.ApplicationVersion);
				console.log("Application Token: " + config.ApplicationToken);
				console.log("CORS Domain: " + config.ServicesDomain);

				presenter.ToggleActivity(true);

				config.DataServiceInit();

				$.when(dataprimer.SessionStart())
				.then(function(result) {
					config.CurrentUser(result.AuthCustomer);
				})
				//.then(dataprimer.Fetch())
				.done(binder.Bind)
				.done(routeConfig.Register)
				.fail()
				.always(function () {
					presenter.ToggleActivity(false);
				});
			};

		/** Return class. */
		return {
			run: _run
		};
	});