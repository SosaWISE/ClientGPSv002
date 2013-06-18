/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/22/13
 * Time: 9:48 AM
 * To change this template use File | Settings | File Templates.
 */
define('model.event',
['ko'],
function (ko) {
	/** Init. */
	var
		_dc = null,

		Event = function () {
			var self = this;
			self.EventID = ko.observable();
			self.EventTypeId = ko.observable();
			self.EventType = ko.observable();
			self.AccountId = ko.observable();
			self.CustomerId = ko.observable();
			self.CustomerMasterFileId = ko.observable();
			self.AccountName = ko.observable();
			self.EventName = ko.observable();
			self.EventDate = ko.observable();
			self.Longitude = ko.observable();
			self.Lattitude = ko.observable();


			self.isBrief = ko.observable(true);
			self.isNullo = false;
			self.dirtyFlag = new ko.DirtyFlag([
			]);

			/** Return object. */
			return self;
		};

	Event.Nullo = new Event();
	Event.Nullo.isNullo = true;
	Event.Nullo.isBrief = function () { return false; };  // nullo is never brief.
	Event.Nullo.dirtyFlag().reset();

	/** Static memeber. */
	Event.datacontext = function (dc) {
		if (dc) { _dc = dc; }
		return _dc;
	};

	/** Return object. */
	return Event;
});