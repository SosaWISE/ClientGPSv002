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
	'datacontext'
],
function ($, config, messenger, ko, datacontext) {
	var
		/** START Private Properties. */
		_tmplName = 'reports.view',
		_tmplModuleName = 'reports.module.view',
	/**   END Private Properties. */

		/** START Private Methods. */
			_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();

			if (_devices().length == 0) loadDevices();
			if (_eventTypes().length == 0) loadEventTypes();
			if (_locations().length == 0) loadLocations();

			if (callback) callback();
		},
//		_devices = [
//			{ name: '[Select One]', id: 1 , disable: ko.observable(true) },
//			{ name: 'My Baby Bro', id: 1 , disable: ko.observable(false) },
//			{ name: 'Sandra\'s B', id: 2 , disable: ko.observable(false) }
//		],
		_devices = ko.observableArray(),
		_eventTypes = ko.observableArray(),
		_locations = ko.observableArray(),
		_setDeviceOptionDisable = function (option, item) {
			ko.applyBindingsToNode(option, {disable: item.disable}, item);
		},
		/**   END Private Methods. */

		init = function () {
		},
		refresh = function () {
			_devices.destroyAll();
			loadDevices();
			_eventTypes.destroyAll();
			loadEventTypes();
			_locations.destroyAll();
			loadLocations();
		},
		loadDevices = function () {
			/** Initialize view model. */
			var list = ko.observableArray();

			/** Init devices DDL. */
			$.when(
					datacontext.Devices.getData(
						{
							results: list,
							param: {
								UniqueID: datacontext.Customer.model.customerMasterFileId()
							}
						}
					)
				)
				.then(function () {
					/** Add to DDL. */
					_devices.push({ name: config.LocalText.AllDevices, id: 0, disable: ko.observable(false)});
					_.each(list(), function (model) {
						_devices.push({ name: model.DeviceName(), id: model.DeviceID(), disable: ko.observable(false)});
					});
				}, function (someArg) {
					debugger;
					alert('SomeArg: ' + someArg);
				});
		},
		loadEventTypes = function () {
			/** Initialize view model. */
			var list = ko.observableArray();

			/** Pull data. */
			$.when(
					datacontext.EventTypes.getData(
						{
							results: list,
							param: {}
						}
					)
				)
				.then(function () {
					/** Add to DDL. */
					_eventTypes.push({ name: config.LocalText.AllEventTypes, id: 0, disable: ko.observable(false)});
					_.each(list(), function (model) {
						_eventTypes.push({name: model.EventType(), id: model.EventTypeID(), disabled: ko.observable(false)});
					});
				}, function (someArg) {
					debugger;
					alert('SomeArg pulling EventTypes: ' + someArg);
				});
		},
		loadLocations = function () {
			/** Initialize view model. */
			var list = ko.observableArray();

			/** Pull data. */
			$.when(
					datacontext.GeoFences.getData(
						{
							results: list,
							param: {
								CMFID: datacontext.Customer.model.customerMasterFileId()
							}
						}
					)
				)
				.then(function () {
					/** Add to DDL> */
					_locations.push({ name: config.LocalText.AllLocations, id: 0, disable: ko.observable(false)});
					_.each(list(), function (model) {
						_locations.push({ name: model.GeoFenceName, id: model.GeoFenceID, disable: ko.observable(false)});
					});
				}, function (someArg) {
					debugger;
					alert('SomeArg pulling locations: ' + someArg);
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
		get Activate() { return _activate; },
		get TmplName() { return _tmplName; },
		get TmplModuleName() { return _tmplModuleName; },
		get Devices() { return _devices; },
		get Locations() { return _locations; },
		get EventTypes() { return _eventTypes; },
		get SetDeviceOptionDisable() { return _setDeviceOptionDisable; }
	};
});
