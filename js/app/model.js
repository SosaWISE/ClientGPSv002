/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 5:35 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'model.customer',
	'model.session',
	'model.event',
	'model.eventType',
	'model.device',
	'model.geoFence',
	'model.user'
],
	function (customer, session, event, eventType, device, geoFence, user) {
		var
			model = {
				get Customer()  { return customer; },
				get Session() { return session; },
				get Event() { return event; },
				get EventType() { return eventType; },
				get Device() { return device; },
				get GeoFence() { return geoFence; },
				get User() { return user; }
			};

		model.setDataContext = function (dc) {
			// Model's that have navigation properties
			// need a reference to the datacontext.
			model.Customer.datacontext(dc);
			model.Session.datacontext(dc);
			model.Event.datacontext(dc);
			model.EventType.datacontext(dc);
			model.Device.datacontext(dc);
			model.GeoFence.datacontext(dc);
			model.User.datacontext(dc);
		};

		/** Return object. */
		return model;
	});
