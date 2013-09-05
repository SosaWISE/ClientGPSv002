/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 9/04/13
 * Time: 11:20 AM
 * To change this template use File | Settings | File Templates.
 */
define(['ko'],
function (ko) {
	/** Init. */
	var
		_dc = null,

		EventType = function () {
			var self = this;

			self.EventTypeID = ko.observable();
			self.EventType = ko.observable();

			self.isBrief = ko.observable(true);
			self.isNullo = false;
			self.dirtyFlag = new ko.DirtyFlag([
			]);
		};

	EventType.Nullo = new EventType();
	EventType.Nullo.isNullo = true;
	EventType.Nullo.isBrief = function () { return false; };  // nullo is never brief.
	EventType.Nullo.dirtyFlag().reset();

	/** Static memeber. */
	EventType.datacontext = function (dc) {
		if (dc) { _dc = dc; }
		return _dc;
	};

	/** Return object. */
	return EventType;
});