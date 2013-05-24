/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 6:08 PM
 * To change this template use File | Settings | File Templates.
 */
define('dataservice.session',
['amplify', 'config'],
function (amplify, config) {
	var
		/** START Constructor. */
		_init = function () {
			/**
			 * @description This initiates the session.
			 */
			amplify.request.define('session-start', 'ajax', {
				url: config.ServicesDomain + 'AuthSrv/SessionStart',
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				cache: false,
				crossDomain: true,
					xhrFields: {
						withCredentials: true
					}
			});

			/**
			 * @description This terminates the session.
			 */
			amplify.request.define('session-terminate', 'ajax', {
				url: config.ServicesDomain + 'AuthSrv/SessionTerminate',
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				cache: false,
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				}
			});
		},
		/**   END Constructor. */
		/** START Public Methods. */
		sessionStart = function (callbacks) {
			return amplify.request({
				resourceId: 'session-start',
				data: JSON.stringify({ AppToken: config.ApplicationToken }),
				success: function (response) {
					if (response.Code !== 0) {
						callbacks.error(response);
						return;
					}
					callbacks.success(response.Value);
				},
				error: callbacks.error
			});
		},
		sessionTerminate = function (callbacks) {
			return amplify.request({
				resourceId: 'session-terminate',
				success: callbacks.success,
				error: callbacks.error
			});
		};
		/**   END Public Methods. */

	/** START Init Class. */
	_init();
	/**   END Init Class. */

	/** Return object. */
	return {
		get SessionStart() { return sessionStart; },
		get SessionTerminate() { return  sessionTerminate; }
	};
});