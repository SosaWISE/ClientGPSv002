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
	'vm.devices',
	'vm.users',
	'vm.home'
],
function (vmLogin, vmRegister, devices, users, home) {
	var
		topLevelViews = [
			home,
			devices,
			users
		]
		// activeType = ko.observable('home');

	// function setActivateCmd(view) {
	// 	view.activateCmd = ko.asyncCommand({
	// 		execute: function (complete) {
	// 			view.Activate();
	// 			complete();
	// 		},
	// 		canExecute: function (isExecuting) {
	// 			return !isExecuting;// && isDirty() && isValid();
	// 		}
	// 	});
	// }
	// devices.groups.forEach(setActivateCmd);
	// topLevelViews.forEach(setActivateCmd);

	return {
		topLevelViews: topLevelViews,
		// activeType: activeType,
		get Home() { return home; },
		get Login() { return vmLogin; },
		get Register() { return vmRegister; },
		get Devices() { return devices; },
		get Users() { return users }
	};
});
