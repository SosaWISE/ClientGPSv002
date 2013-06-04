/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.devices',
[
	'config',
	'messenger',
	'vm.events',
	'vm.devices-tab',
	'vm.geoFences'
],
function (config, messenger, events, devices, geofences) {
	var
		/** START Private Properties. */
		editing = ko.observable(false),
		editItem = ko.observable(null),
		/**   END Private Properties. */

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) callback();
		},
		/**   END Private Methods. */

		init = function () {
			/** Initialize view model. */
		},
		getGroupTmpl = function(vm) {
			console.log('getGroupTmpl', vm.TmplName);
			return vm.TmplName;
		},
		groups = [
			events,
			devices,
			geofences
		];

	groups.forEach(function(vm) {
		vm.editing.subscribe(function() {
			if (vm.active()) {
				editing(vm.editing());
			}
		});
		vm.editItem.subscribe(function() {
			if (vm.active()) {
				editItem(vm.editItem());
			}
		});
	});

	function activateGroup(vm) {
		groups.forEach(function(vm) {
			vm.active(false);
		});
		vm.active(true);
		editing(vm.editing());
		editItem(vm.editItem());
	}
	activateGroup(events);

	/** Init object. */
	init();

	/** Return object. */
	return {
		editing: editing,
		editItem: editItem,
		hash: config.Hashes.devices,
		ico: '&#59176;',
		type: 'devices',
		name: 'Devices',
		TmplName: 'devices.view',
		getGroupTmpl: getGroupTmpl,
		groups: groups,
		activateGroup: activateGroup,
		get Activate() { return _activate; }
	};
});
