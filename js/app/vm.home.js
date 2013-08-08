/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/24/13
 * Time: 5:15 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'jquery',
	'underscore',
	'config',
	'messenger',
	'utils',
	'ko',
	'amplify',
	'datacontext'
],
function ($, _, config, messenger, utils, ko, amplify, datacontext) {
	var
		_tmplName = 'home.view',
		_tmplModuleName = 'home.module.view',
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated({canleaveCallback: canLeave});
			if (callback) { callback(); }
		},
		canLeave = function () {
			return true;
		},
		init = function () {
			amplify.subscribe('customerAuthentication', function (/*data*/) {
				_refresh(/*data*/);
			});
			amplify.subscribe('sessionAuthentication', function (/*data*/) {
				_refresh(/*data*/);
			});
		},
		_devices = ko.observableArray(),
		_events = ko.observableArray([
			{
				type: 'sos',
				title: 'Rascal exited the Yard geofence',
				time: 'EEApril 23, 2013 at 12:42pm',
				actions: ''
			}
		]),
		deviceTypes = ko.observableArray([
			{
				type: 'home',
				name: 'Home Security System (KinTouch TM)'
			},
			{
				type: 'car-nav',
				name: 'Car Navigation System (Encompass TM)'
			},
			{
				type: 'bracelet',
				name: 'Health Care Bracelet'
			},
			{
				type: 'phone',
				name: 'Mobile Phone Application'
			},
			{
				type: 'child',
				name: 'Child GPS Tracker'
			},
			{
				type: 'pet',
				name: 'Pet GPS Tracker'
			},
			{
				type: 'car',
				name: 'Automobile Tracker'
			},
			{
				type: 'watch',
				name: 'GPS Watch Tracker'
			}
		]),
		_refresh = function (callback) {
			/** Init */
			var data = {
				devices: ko.observableArray(),
				events: ko.observableArray()
			};

			/** Initialize view model. */
			$.when(
				datacontext.Devices.getData(
					{
						results: data.devices,
						param: {
							UniqueID: datacontext.Customer.model.customerMasterFileId()
						}
					}
				),
				datacontext.Events.getData(
					{
						results: data.events,
						param: {
							CMFID: datacontext.Customer.model.customerMasterFileId(),
							PageSize: 10,
//							EndDate: utils.GetNowDateTime(),
//							StartDate: utils.AddToDate(utils.GetNowDateTime(), -5)
							EndDate: '6/19/2013',
							StartDate: '1/19/2013'
						}
					}
				)

			)
			.then(function (response) {
				/** Init. */
				console.log(response);
				_devices.removeAll();
				/** Initialize. */
				_.each(data.devices(), function (item) {
					_devices.push(item);
				});

				_events.removeAll();
				/** Bind events to main body. */
				_.each(data.events(), function (item) {
					_events.push({
						type: item.EventTypeUi(),
						title: item.EventShortDesc(),
						time: utils.DateWithFormat(item.EventDate(),'MMMM Do, YYYY @ hh:mm:ss a'),
						actions: ''
					});

					item.type = item.EventTypeUi;
					item.title = item.EventShortDesc;
					item.time = utils.DateWithFormat(item.EventDate(),'MMMM Do, YYYY @ hh:mm:ss a');
					item.actions = '';
				});

				utils.InvokeFunctionIfExists(callback);
			}, function (/*someArg*/) {
					//alert('SomeArg:' + someArg);
			});
		},
		selectDevice = function (model) {
			amplify.publish('select:device', model.DeviceID());
		};

	deviceTypes().forEach(function(deviceType) {
		deviceType.addDeviceCmd = ko.asyncCommand({
			execute: function (complete) {
				// currently does nothing
				complete();
			},
			canExecute: function (isExecuting) {
				return !isExecuting;// && isDirty() && isValid();
			}
		});
	});

	/** Init the object. */
	init();

	/** Return object. */
	return {
		editing: ko.observable(false),
		editItem: ko.observable(null),
		hash: config.Hashes.home,
		ico: '&#8962;',
		type: 'home',
		name: 'Home',
		selectDevice: selectDevice,
		get TmplName() { return _tmplName; },
		get TmplModuleName() { return _tmplModuleName; },
		get devices() { return  _devices; },
		get events() { return _events; },
		deviceTypes: deviceTypes,
		get Activate() { return _activate; }/*,
		get Refresh() { return _refresh; }*/
	};
});
