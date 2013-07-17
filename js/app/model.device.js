/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/22/13
 * Time: 9:57 AM
 * To change this template use File | Settings | File Templates.
 */
define(['ko'],
function (ko) {
	/** Init. */
	var
		_dc = null,

		Device = function () {
			var self = this;
			self.DeviceID = ko.observable();
			self.DeviceName = ko.observable();
			self.CustomerID = ko.observable();
			self.CustomerMasterFileId = ko.observable();
			self.Designator = ko.observable();
			self.IndustryAccountId = ko.observable();
			self.IndustryNumber = ko.observable();
			self.InvItemId = ko.observable();
			self.PanelTypeId = ko.observable();
			self.Password = ko.observable();
			self.SubscriberNumber = ko.observable();
			self.SystemTypeId = ko.observable();
			self.UnitID = ko.observable();
			self.Username = ko.observable();

			self.type = ko.observable();
			self.title = ko.observable();
			self.time = ko.observable();

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
