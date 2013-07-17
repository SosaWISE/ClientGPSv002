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
	'dataservice.users'
],
function (session, customer, devices, geoFences, events, users) {
	return {
		get Session() { return session; },
		get Customer() { return customer; },
		get Devices() { return devices; },
		get GeoFences() { return geoFences; },
		get Events() { return events; },
		get Users() { return users; }
	};
});
