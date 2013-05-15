/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/14/13
 * Time: 1:47 PM
 * To change this template use File | Settings | File Templates.
 */
define('bootstrapper',
	['jquery','config'],
	function ($, config) {
		/** Initialize. */
		var
			_run = function () {
				console.log("Bootstrappling version: ", config.ApplicationVersion);
				console.log("Application Token: " + config.ApplicationToken);
				console.log("CORS Domain: " + config.ServicesDomain);
			};

		/** Return class. */
		return {
			run: _run
		};
	});