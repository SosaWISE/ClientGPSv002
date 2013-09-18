/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 6:03 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'dataservice.session',
	'dataservice.customer',
	'dataservice.devices',
	'dataservice.geoFences',
	'dataservice.events',
	'dataservice.eventTypes',
	'dataservice.users'
], function(session, customer, devices, geoFences, events, eventTypes, users) {
	return {
		Session: session,
		Customer: customer,
		Devices: devices,
		GeoFences: geoFences,
		Events: events,
		EventTypes: eventTypes,
		Users: users,
	};
});
