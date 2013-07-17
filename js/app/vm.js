/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/18/13
 * Time: 11:23 AM
 * To change this template use File | Settings | File Templates.
 */
define([
	'vm.login',
	'vm.register',
	'vm.devices',
	'vm.devices-tab',
	'vm.users',
	'vm.home',
	'vm.billing',
	'vm.reports',
	'vm.settings'
],
function (vmLogin, vmRegister, devices, devicesTab, users, home, billing, reports, settings) {
	var
		_topLevelViews = [
			home,
			devices,
			users,
			billing,
			reports,
			settings
		],
		init = function () {
			console.log("Init vm");
			console.log(devicesTab);
		};
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

	/** Init the object. */
	init();

	return {
		get topLevelViews() { return _topLevelViews; },
		get Home() { return home; },
		get Login() { return vmLogin; },
		get Register() { return vmRegister; },
		get Devices() { return devices; },
		get DevicesTab() { return devicesTab; },
		get Users() { return users; },
		get Billing() { return billing; },
		get Reports() { return reports; },
		get Settings() { return settings; }
	};
});
