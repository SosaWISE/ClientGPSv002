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

		self.isBrief = ko.observable(true);
		self.isNullo = false;
		self.dirtyFlag = new ko.DirtyFlag([
		]);

		/** Return object. */
		return self;
	};

	GeoFence.Nullo = new GeoFence();
	GeoFence.Nullo.isNullo = true;
	GeoFence.Nullo.isBrief = function () { return false; };  // nullo is never brief.
	GeoFence.Nullo.dirtyFlag().reset();

	/** Static memeber. */
	GeoFence.datacontext = function (dc) {
		if (dc) { _dc = dc; }
		return _dc;
	};

	/** Return object. */
	return GeoFence;
});