/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 2:22 PM
 * To change this template use File | Settings | File Templates.
 */
define('dataservice.devices',
['amplify', 'config'],
function (amplify, config) {
	var
	/** START Initialize object. */
		_init = function () {
		amplify.request.define('devices-acquire', 'ajax', {
			url: config.ServicesDomain + 'Device/AcquireList',
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			}
		});

		amplify.request.define('devices-acquireByCustomerID', 'ajax', {
			url: config.ServicesDomain + 'Device/AcquireListByCustomerID',
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			}
		});

		amplify.request.define('devices-acquireDetails', 'ajax', {
			url: config.ServicesDomain + 'Device/AcquireDeviceDetails',
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
	_acquireList = function (callbacks, data) {
		return amplify.request({
			resourceId: 'devices-acquire',
			data: data,
			success: callbacks.success,
			error: callbacks.error
		});
	},
	_acquireListByCutomerId = function (callbacks, data) {
		return amplify.request({
			resourceId: 'devices-acquireByCustomerID',
			data: data,
			success: callbacks.success,
			error: callbacks.error
		});
	},
	_acquireDetails = function (callbacks, data) {
		return amplify.request({
			resourceId: 'devices-acquireDetails',
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
		get AcquireList() { return _acquireList; },
		get AcquireListByCustomerId() { return _acquireListByCutomerId; },
		get AcquireDetails() { return _acquireDetails; }
	};
});