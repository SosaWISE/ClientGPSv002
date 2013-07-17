/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 10:17 AM
 * To change this template use File | Settings | File Templates.
 */
define(['ko'],
	function (ko) {
		var EventFilter = function () {
			var self = this;
			self.EventType = ko.observable();
			self.MaxDateTime = ko.observable();
			self.MinDateTime = ko.observable();
			self.DeviceId = ko.observable();
			return self;
		};

		EventFilter.prototype = function () {
			var
				eventTypeTest = function (eventType, event) {
					// returns true if the event types match.
						if (!eventType) return true;
						return eventType === event.Eventtype;
				},
				dateRangeTest = function (minDateTime, maxDateTime, event) {
					// Return true if it meets the filter criteria.  Otherwise, return false.
					if (minDateTime && minDateTime > event.EventDate().start()) return false;
					return !(maxDateTime && maxDateTime < event.EventDate().start());

				},
				deviceIdTest = function (deviceId, event) {
					if (!deviceId) return true;
					return deviceId === event.DeviceId;
				},
				fenceIdTest = function (fenceId, event) {},
				predicate = function (self, event) {
					/** Init. */
					var match = eventTypeTest(self.Eventtype(), event)
						&& dateRangeTest(self.MinDateTime(), self.MaxDateTime(), event)
						&& deviceIdTest(self.DeviceId(), event);

					/** For Debugging. */
					console.log(match);
					/** Return result. */
					return match;
				};

			/** Return the predicate. */
			return {
				Predicate: predicate
			};
		};

		/** Return object. */
		return EventFilter;
	});
