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
	/** Define class. */
	var Device = function () {
		var self = this;
		self.DeviceID = ko.observable();
	};

	/** Return object. */
	return Device;
});