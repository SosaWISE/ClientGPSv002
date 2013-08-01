/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'config',
	'messenger',
	'ko',
	'vm.events',
	'vm.devices-tab',
	'vm.geoFences',
	'flowMap/index',
	'gmaps',
],
function (config, messenger, ko, events, devices, geofences, flowMap, gmaps) {
	var
		self,
		/** START Private Properties. */
		_tmplName =  'devices.view',
		_tmplModuleName =  'devices.module.view',
		editing = ko.observable(false),
		editItem = ko.observable(null),
		/**   END Private Properties. */

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();

			// first time
			if (!self.fmap) {
				/** Show map. */
				setTimeout(function () {
					self.fmap = new flowMap.Map(document.getElementById("devices-map"), {
						//@TODO: dynamically set initial center and zoom
						center: new gmaps.LatLng(40.323110654354856, -111.68210183710936),
						zoom: 14,

						mapTypeId: gmaps.MapTypeId.ROADMAP,
						zoomControl: true,
						//zoomControlOptions: { style: gmaps.ZoomControlStyle.SMALL },
						scaleControl: true,
						mapTypeControl: true,
						disableDefaultUI: true,
					});
					setTimeout(function () {
						// self.fmap.clear();
						// self.fmap.endEdit();
						self.fmap.beginEdit();
					}, 3000);

					// initialize all group view models
					groups.forEach(function(vm) {
						vm.init(self);
					});

					// activate events tab
					activateGroup(events);


					if (callback) { callback(); }
				}, 200);
			}
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

	/** Init object. */
	init();

	/** Return object. */
	self = {
		editing: editing,
		editItem: editItem,
		hash: config.Hashes.devices,
		ico: '&#59176;',
		type: 'devices',
		name: 'Devices',
		get TmplName() {return _tmplName; },
		get TmplModuleName() { return _tmplModuleName; },
		getGroupTmpl: getGroupTmpl,
		groups: groups,
		activateGroup: activateGroup,
		get Activate() { return _activate; }
	};
	return self;
});
