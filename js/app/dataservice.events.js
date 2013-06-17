/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/21/13
 * Time: 10:17 PM
 * To change this template use File | Settings | File Templates.
 */
define('dataservice.events',
['amplify','config','ko'],
function (amplify, config, ko) {
	var
	/** START Initialize object. */
		_init = function () {

			amplify.request.define('devices-AcquireDeviceEvents', 'ajax', config.AjaxProps('Device/AcquireMasterDeviceEvents'));
	},
	/**   END Initialize object. */

	/** START Public Methods. */
	_acquireEvents = function (callbacks, data) {
		/** Init */
		var jsonData = ko.toJSON(data);
debugger;
		return amplify.request({
			resourceId: 'devices-AcquireDeviceEvents',
			data: jsonData,
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