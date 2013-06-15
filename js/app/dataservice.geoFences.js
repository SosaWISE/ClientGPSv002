/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */
define('dataservice.geoFences',
['amplify', 'config', 'ko'],
function (amplify, config, ko) {
	var
		_init = function () {

			amplify.request.define('devices-acquireGeoFences', 'ajax', config.AjaxProps('Device/AcquireDeviceGeoFences'));

		},

		_getData = function (callbacks, data) {
			/** Init */
			var jsonData = ko.toJSON(data);

			/** Execute. */
			return amplify.request({
				resourceId: 'devices-acquireGeoFences',
				data: jsonData,
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