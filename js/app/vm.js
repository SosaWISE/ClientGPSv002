/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/18/13
 * Time: 11:23 AM
 * To change this template use File | Settings | File Templates.
 */
define ('vm',
[
	'vm.events',
	'vm.devices',
	'vm.geoFences',
	'vm.users'
],
function (events, devices, geoFences, users) {
	return {
		get Events() { return events; },
		get Devices() { return devices; },
		get GeoFences() { return geoFences; },
		get Users() { return users }
	};
});