/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/22/13
 * Time: 9:57 AM
 * To change this template use File | Settings | File Templates.
 */
define('model.device',
['ko'],
function (ko) {
	/** Init. */
	var
		_dc = null,

		Device = function () {
			var self = this;
			self.DeviceID = ko.observable();

			self.isBrief = ko.observable(true);
			self.isNullo = false;
			self.dirtyFlag = new ko.DirtyFlag([
			]);

			/** Return object. */
			return self;
		};

	Device.Nullo = new Device();
	Device.Nullo.isNullo = true;
	Device.Nullo.isBrief = function () { return false; };  // nullo is never brief.
	Device.Nullo.dirtyFlag().reset();

	/** Static memeber. */
	Device.datacontext = function (dc) {
		if (dc) { _dc = dc; }
		return _dc;
	};

	/** Return object. */
	return Device;
});