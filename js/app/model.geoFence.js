/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/22/13
 * Time: 9:54 AM
 * To change this template use File | Settings | File Templates.
 */
define('model.geoFence',
['ko'],
function (ko) {
	/** Define Model. */
	var GeoFence = function () {
		var self = this;

		self.GeoFenceID = ko.observable();
	};

	/** Return object. */
	return GeoFence;
});