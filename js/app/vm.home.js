/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/24/13
 * Time: 5:15 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.home',
[
	'config',
	'messenger',
	'utils',
	'amplify'
],
function (config, messenger, utils, amplify) {
	var
		_tmplName = 'home.view',
		_tmplModuleName = 'home.module.view',
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated({canleaveCallback: canLeave});
			if (callback) callback();
		},
		canLeave = function () {
			return true;
		},
		init = function () {
			amplify.subscribe('customerAuthentication', function (data) {
				console.log(data);
				_refresh(data);
			});
			amplify.subscriber('sessionAuthentication', function (data) {

			});
		},
		devices = ko.observableArray([
			{
				type: 'watch',
				name: 'Austin\'s GPS Watch'
			},
			{
				type: 'phone',
				name: 'Austin\'s GPS Watch'
			},
			{
				type: 'home',
				name: 'Austin\'s GPS Watch'
			},
			{
				type: 'pet',
				name: 'Austin\'s GPS Watch'
			},
			{
				type: 'car',
				name: 'Austin\'s GPS Watch'
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
		_refresh = function (rawList, callback) {
			utils.InvokeFunctionIfExists(callback);
			/** Refresh */
			devices.removeAll();
			/** Initialize. */
			_.each(rawList, function (item) {
				devices.push({
					type: item.type(),
					name: item.title()
				});
			});
		};

	devices().forEach(function(device) {
		device.selectDeviceCmd = ko.asyncCommand({
			execute: function (complete) {
				// currently does nothing
				debugger;
				complete();
			},
			canExecute: function (isExecuting) {
				return !isExecuting;// && isDirty() && isValid();
			}
		});
	});
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

	/** Return object. */
	return {
		editing: ko.observable(false),
		editItem: ko.observable(null),
		hash: config.Hashes.home,
		ico: '&#8962;',
		type: 'home',
		name: 'Home',
		get TmplName() { return _tmplName; },
		get TmplModuleName() { return _tmplModuleName; },
		devices: devices,
		deviceTypes: deviceTypes,
		get Activate() { return _activate; },
		get Refresh() { return _refresh; }
	};
});
