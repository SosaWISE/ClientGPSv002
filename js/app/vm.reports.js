/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 6/4/13
 * Time: 3:00 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'jquery',
	'config',
	'messenger',
	'ko',
	'dataservice'
], function(
	$,
	config,
	messenger,
	ko,
	dataservice
) {
	/** START Private Properties. */
	var _activate = function(routeData, callback) {
		messenger.publish.viewModelActivated();

		if (_devices().length === 0) {
			loadDevices();
		}
		if (_eventTypes().length === 0) {
			loadEventTypes();
		}
		if (_locations().length === 0) {
			loadLocations();
		}

		if (callback) {
			callback();
		}
	},
		//		_devices = [
		//			{ name: '[Select One]', id: 1 , disable: ko.observable(true) },
		//			{ name: 'My Baby Bro', id: 1 , disable: ko.observable(false) },
		//			{ name: 'Sandra\'s B', id: 2 , disable: ko.observable(false) }
		//		],
		_devices = ko.observableArray(),
		_eventTypes = ko.observableArray(),
		_locations = ko.observableArray(),
		_setDeviceOptionDisable = function(option, item) {
			ko.applyBindingsToNode(option, {
				disable: item.disable
			}, item);
		},
		/**   END Private Methods. */

		init = function() {},
		// refresh = function() {
		// 	_devices.destroyAll();
		// 	loadDevices();
		// 	_eventTypes.destroyAll();
		// 	loadEventTypes();
		// 	_locations.destroyAll();
		// 	loadLocations();
		// },
		loadDevices = function() {
			dataservice.Devices.getData({
				UniqueID: dataservice.Customer.model.customerMasterFileId()
			}, function(resp) {
				if (resp.Code !== 0) {
					alert('Error loading devices: ' + resp.Message);
					return;
				}
				/** Add to DDL. */
				_devices.push({
					name: config.LocalText.AllDevices,
					id: 0,
					disable: ko.observable(false)
				});
				resp.Value.forEach(function(model) {
					_devices.push({
						name: model.DeviceName(),
						id: model.AccountId(),
						disable: ko.observable(false)
					});
				});
			});
		},
		loadEventTypes = function() {
			dataservice.EventTypes.getData({}, function(resp) {
				if (resp.Code !== 0) {
					alert('Error loading event types: ' + resp.Message);
					return;
				}

				/** Add to DDL. */
				_eventTypes.push({
					name: config.LocalText.AllEventTypes,
					id: 0,
					disable: ko.observable(false)
				});
				resp.Value.forEach(function(model) {
					_eventTypes.push({
						name: model.EventType(),
						id: model.EventTypeID(),
						disabled: ko.observable(false)
					});
				});
			});
		},
		loadLocations = function() {
			dataservice.GeoFences.getData({
				CMFID: dataservice.Customer.model.customerMasterFileId()
			}, function(resp) {
				if (resp.Code !== 0) {
					alert('Error loading locations: ' + resp.Message);
					return;
				}

				/** Add to DDL> */
				_locations.push({
					name: config.LocalText.AllLocations,
					id: 0,
					disable: ko.observable(false)
				});
				resp.Value.forEach(function(model) {
					_locations.push({
						name: model.GeoFenceName,
						id: model.GeoFenceID,
						disable: ko.observable(false)
					});
				});
			});
		};

	/** Init object. */
	init();

	/** Return object. */
	return {
		hash: config.Hashes.reports,
		ico: '&#128202;',
		type: 'reports',
		name: 'Reports',
		Activate: _activate,
		TmplName: 'reports.view',
		TmplModuleName: 'reports.module.view',
		Devices: _devices,
		Locations: _locations,
		EventTypes: _eventTypes,
		SetDeviceOptionDisable: _setDeviceOptionDisable,
	};
});
