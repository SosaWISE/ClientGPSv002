/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 2:22 PM
 * To change this template use File | Settings | File Templates.
 */
define('dataservice.devices',
['amplify', 'config', 'ko'],
function (amplify, config, ko) {
	var
	/** START Initialize object. */
		_init = function () {
		amplify.request.define('devices-acquire', 'ajax', config.AjaxProps('Device/AcquireList'));

		amplify.request.define('devices-acquireByCustomerID', 'ajax', config.AjaxProps('Device/AcquireListByCustomerID'));

		amplify.request.define('devices-acquireDetails', 'ajax', config.AjaxProps('Device/AcquireDeviceDetails'));
	},
	/**   END Initialize object. */

	/** START Public Methods. */
	_acquireList = function (callbacks, data) {
		/** Init. */
		var jsonData = ko.toJSON(data);

		/** Execute. */
		return amplify.request({
			resourceId: 'devices-acquire',
			data: jsonData,
			success: callbacks.success,
			error: callbacks.error
		});
	},
	_acquireListByCutomerId = function (callbacks, data) {
		/** Init. */
		var jsonData = ko.toJSON(data);

		/** Execute. */
		return amplify.request({
			resourceId: 'devices-acquireByCustomerID',
			data: jsonData,
			success: callbacks.success,
			error: callbacks.error
		});
	},
	_acquireDetails = function (callbacks, data) {
		/** Init. */
		var jsonData = ko.toJSON(data);

		/** Execute. */
		return amplify.request({
			resourceId: 'devices-acquireDetails',
			data: jsonData,
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