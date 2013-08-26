/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 6:07 PM
 * To change this template use File | Settings | File Templates.
 */
define(['amplify','config'],
function (amplify, config) {
	var
		_init = function () {
			/**
			 * @description This does the authentication of the customer logging in.
			 */
			amplify.request.define('customer-auth', 'ajax', {
				url: config.ServicesDomain + 'AuthSrv/CustomerAuth',
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				}
			});

			amplify.request.define('customer-update', 'ajax', {
				url: config.ServicesDomain + 'AuthSrv/CustomerUpdate',
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				}
			});

			amplify.request.define('customer-signUp', 'ajax', {
				url: config.ServicesDomain + 'AuthSrv/CustomerSignUp',
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				}
			});
		},

		/** START Public Methods. */
		customerAuth = function(callbacks, data) {
			return amplify.request({
				resourceId: 'customer-auth',
				data: data,
				success: callbacks.success,
				error: callbacks.error
			});
		},

		customerUpdate = function (callbacks, data) {
			return amplify.request({
				resourceId: 'customer-update',
				data: data,
				success: callbacks.success,
				error: callbacks.error
			});
		},

		customerSignUp = function (callbacks, data) {
			if (typeof(data) !== "string") {
				data = JSON.stringify(data);
			}
			return amplify.request({
				resourceId: 'customer-signUp',
				data: data,
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
		get CustomerAuth() { return customerAuth; },
		get CustomerUpdate() { return customerUpdate; },
		get CustomerSignUp() { return customerSignUp; }
	};

});
