/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */
define('dataservice.geoFences',
['amplify', 'config'],
function (amplify, config) {
	var
		_init = function () {

			amplify.request.define('devices-acquireGeoFences', 'ajax', config.AjaxProps('Device/AcquireDeviceGeoFences'));

		},

		_getData = function (callbacks, data) {
			return amplify.request({
				resourceId: 'devices-acquireGeoFences',
				data: data,
				success: callbacks.success,
				error: callbacks.error
			});
		};

	/** Init object. */
	_init();

	/** Return object. */
	return {
		get GetData() { return _getData; }
	};
});