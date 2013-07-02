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
	'amplify',
	'datacontext'
],
function (config, messenger, utils, amplify, datacontext) {
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
			amplify.subscribe('customerAuthentication', function (/*data*/) {
				_refresh(/*data*/);
			});
			amplify.subscribe('sessionAuthentication', function (/*data*/) {
				_refresh(/*data*/);
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
		_refresh = function (callback) {
			/** Init */
			 var data = {
				devices: ko.observableArray()
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
				)
			)
			.then(function (response) {
				/** Init. */
				console.log(response);

				devices.removeAll();
				/** Initialize. */
				_.each(data.devices(), function (item) {
					devices.push({
						type: item.type(),
						name: item.title(),
						selectDeviceCmd: ko.asyncCommand({ execute: selectDeviceCmdExecute, canExecute: selectDeviceCmdCanExecute })
					});
				});

				utils.InvokeFunctionIfExists(callback);
			}, function (/*someArg*/) {
					//alert('SomeArg:' + someArg);
			});
		},
		selectDeviceCmdExecute = function (complete) {
			complete();
		},
		selectDeviceCmdCanExecute = function (isExecuting) { return !isExecuting;/* && isDirty() && isValid();*/ };

	devices().forEach(function(device) {
		device.selectDeviceCmd = ko.asyncCommand({
			execute: selectDeviceCmdExecute,
			canExecute: selectDeviceCmdCanExecute
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
		get TmplName() { return _tmplName; },
		get TmplModuleName() { return _tmplModuleName; },
		devices: devices,
		deviceTypes: deviceTypes,
		get Activate() { return _activate; }/*,
		get Refresh() { return _refresh; }*/
	};
});
