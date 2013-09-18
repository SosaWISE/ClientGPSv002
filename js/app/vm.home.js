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
	'dataservice'
], function(
	$,
	_,
	config,
	messenger,
	utils,
	ko,
	amplify,
	dataservice
) {
	var _tmplName = 'home.view',
		_tmplModuleName = 'home.module.view',
		_activate = function(routeData, callback) {
			messenger.publish.viewModelActivated({
				canleaveCallback: canLeave
			});
			if (callback) {
				callback();
			}
		},
		canLeave = function() {
			return true;
		},
		init = function() {
			amplify.subscribe('customerAuthentication', function() {
				_refresh();
			});
			amplify.subscribe('sessionAuthentication', function() {
				_refresh();
			});
		},
		_devices = ko.observableArray(),
		_events = ko.observableArray(),
		deviceTypes = ko.observableArray([{
			type: 'home',
			name: 'Home Security System (KinTouch TM)'
		}, {
			type: 'car-nav',
			name: 'Car Navigation System (Encompass TM)'
		}, {
			type: 'bracelet',
			name: 'Health Care Bracelet'
		}, {
			type: 'phone',
			name: 'Mobile Phone Application'
		}, {
			type: 'child',
			name: 'Child GPS Tracker'
		}, {
			type: 'pet',
			name: 'Pet GPS Tracker'
		}, {
			type: 'car',
			name: 'Automobile Tracker'
		}, {
			type: 'watch',
			name: 'GPS Watch Tracker'
		}]),
		_refresh = function(callback) {
			var waitingCount = 2;

			function done() {
				waitingCount--;
				if (waitingCount) {
					return;
				}

				if (typeof(callback) === 'function') {
					callback();
				}
			}

			dataservice.Devices.getData({
				UniqueID: config.CurrentUser().CustomerMasterFileId,
			}, function(resp) {
				console.log(resp);
				if (resp.Code !== 0) {
					return;
				}

				_devices([]);
				resp.Value.forEach(function(item) {
					_devices.push(item);
				});

				done();
			});

			dataservice.Events.getData({
				CMFID: config.CurrentUser().CustomerMasterFileId,
				PageSize: 10,
				// EndDate: utils.GetNowDateTime(),
				// StartDate: utils.AddToDate(utils.GetNowDateTime(), -5)
				EndDate: '6/19/2013',
				StartDate: '1/19/2013'
			}, function(resp) {
				console.log(resp);
				if (resp.Code !== 0) {
					return;
				}

				_events([]);
				resp.Value.forEach(function(item) {
					// item.type = item.EventTypeUi;
					// item.title = item.EventShortDesc;
					item.time = utils.DateWithFormat(item.EventDate, 'MMMM Do, YYYY @ hh:mm:ss a');
					item.actions = '';

					_events.push(item);
				});

				done();
			});
		},
		selectDevice = function(model) {
			amplify.publish('select:device', model.AccountId());
		},
		selectEvent = function(model) {
			amplify.publish('select:event', model.EventID());
		};

	deviceTypes().forEach(function(deviceType) {
		deviceType.addDeviceCmd = ko.asyncCommand({
			execute: function(complete) {
				// currently does nothing
				complete();
			},
			canExecute: function(isExecuting) {
				return !isExecuting; // && isDirty() && isValid();
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
		selectEvent: selectEvent,
		TmplName: _tmplName,
		TmplModuleName: _tmplModuleName,
		devices: _devices,
		events: _events,
		deviceTypes: deviceTypes,
		Activate: _activate,
		/*,
		get Refresh() { return _refresh; }*/
	};
});
