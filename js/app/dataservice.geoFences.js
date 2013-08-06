/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */
define(['amplify','config','ko'],
function (amplify, config, ko) {
	var
		_init = function () {

			amplify.request.define('devices-acquireGeoFences', 'ajax', config.AjaxProps('Device/AcquireDeviceGeoFences'));
			amplify.request.define('devices-saveGeoFences', 'ajax', config.AjaxProps('GeoSrv/GeoRectangleSave'));

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
		},

		/**
		 * @Description  Below is a description of the properties of the data object.
		 *	<br />long GeoFenceID -- This is the primary key of the object.  If not present then the API will create a
		 *	new geoFence.
		 *	<br />long SessionID -- This is the current SessionID
		 *	<br />long AccountId -- The account id that this geofence is tied to.
		 *	<br />long CustomerId -- The Customer Id to which the account id belongs to.
		 *	<br />string GeoFenceName -- Name of the fence.  i.e. My House.
		 *	<br />string GeoFenceDescription -- Long description
		 *	<br />string ItemId -- This is the type of device that the geoFence belongs to. (For Laipac use  S911BRC-HC, S911BRC-CE)
		 *	<br />string ReportMode -- Possible values (1-Exit Alert; 2-Enter Alert; 3-Exit Enter Alert)
		 *	<br />double MaxLattitude -- Maximum Latitude
		 *	<br />double MinLongitude -- Minimum Longitude
		 *	<br />double MaxLongitude -- Maximum Longitude
		 *	<br />double MinLattitude -- Minimum Latitude
		 *	<br />short? ZoomLevel -- Google Maps Zoom Level
		 */
		_saveData = function (callbacks, data) {
			/** Init */
			var jsonData = ko.toJSON(data);

			/** Execute */
			return amplify.request({
				resourceId: 'devices-saveGeoFences',
				data: jsonData,
				success: callbacks.success,
				error: callbacks.error
			});
		};

	/** Init object. */
	_init();

	/** Return object. */
	return {
		get GetData() { return _getData; },
		get SaveData() { return _saveData; }
	};
});
