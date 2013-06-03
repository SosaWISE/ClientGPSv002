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
function (config, messenger, events, devices, geoFences) {
	var
		/** START Private Properties. */
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

		groups = [
			events,
			devices,
			geoFences
		];

	function activateGroup(vm) {
		groups.forEach(function(group) {
			group.active(false);
		});
		vm.active(true);
	}
	activateGroup(events);

	/** Init object. */
	init();

	/** Return object. */
	return {
		hash: config.Hashes.devices,
		ico: '&#59176;',
		type: 'devices',
		name: 'Devices',
		TmplName: 'devices.view',
		groups: groups,
		activateGroup: activateGroup,
		get Activate() { return _activate; }
	};
});
