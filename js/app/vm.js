/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/18/13
 * Time: 11:23 AM
 * To change this template use File | Settings | File Templates.
 */
define ('vm',
[
	'vm.login',
	'vm.register',
	'vm.events',
	'vm.devices',
	'vm.geoFences',
	'vm.users'
],
function (vmLogin, vmRegister, events, devices, geoFences, users) {
	return {
		get Login() { return vmLogin; },
		get Register() { return vmRegsiter; },
		get Events() { return events; },
		get Devices() { return devices; },
		get GeoFences() { return geoFences; },
		get Users() { return users }
	};
});