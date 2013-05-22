/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/21/13
 * Time: 10:17 PM
 * To change this template use File | Settings | File Templates.
 */
define('dataservice.events',
['amplify','config'],
function (amplify, config) {
	var
	/** START Initialize object. */
		_init = function () {

			amplify.request.define('devices-acquireEvents', 'ajax', {
				url: config.ServicesDomain + 'Device/AcquireDeviceEvents',
				dataType: 'json',
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				}
			});
	},
	/**   END Initialize object. */

	/** START Public Methods. */
	_acquireEvents = function (callbacks, data) {
		return amplify.request({
			resourceId: 'devices-AcquireDeviceEvents',
			data: data,
			success: callbacks.success,
			error: callbacks.error
		});
	};

	/**   END Public Methods. */
	/** Init object. */
	_init();

	/** Return object. */
	return {
		get GetData() { return _acquireEvents; }
	};
});