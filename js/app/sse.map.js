/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 6/6/13
 * Time: 12:48 PM
 * To change this template use File | Settings | File Templates.
 */
define('sse.map',
['config'],
function (config) {
	var
	/** START Private Properties. */
		_mapElId = 'devices-map',
		mapOptions = {
			zoom: 8,
			center: new google.maps.LatLng(40.2969, -111.6939),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		},
		_map = null,
		isInit = false,
	/**   END Private Properties. */
	/** START Private Methods. */
		init = function () {
			_map = new google.maps.Map(document.getElementsById(_mapElId), mapOptions);
		},
		_activate = function () {
			if (!isInit) {
				isInit = true;
				init();
			}
		};
	/**   END Private Methods. */

	/** Return object. */
	return {
		get MapElId() { return _mapElId; },
		get Activate() { return _activate }
	};
});