/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:36 PM
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','messenger','underscore','datacontext','ko','amplify','utils','gmaps'],
	function ($, messenger, _, datacontext, ko, amplify, utils, gmaps) {
		var
			/** START Private Properties. */
		editing = ko.observable(false),
		editItem = ko.observable(null),
		_list = ko.observableArray(),
		_devices,
		/**	 END Private Properties. */

		/** START Private Methods. */
			_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
		if (callback) { callback(); }
		},

		/**	 END Private Methods. */

		init = function (devices) {
			_devices = devices;
			_list(list);

			amplify.subscribe('customerAuthentication', function (data) {
				console.log(data);
				refresh();
			});
			amplify.subscribe('sessionAuthentication', function (data) {
				console.log(data);
				refresh();
			});

			refresh();
		},
		refresh = function () {
			/** Init */
			var data = {
				events: ko.observableArray()
			};

			/** Load data. */
			$.when(
				datacontext.Events.getData(
					{
						results: data.events,
						param: {
							CMFID: datacontext.Customer.model.customerMasterFileId(),
							PageSize: 10,
//							EndDate: utils.GetNowDateTime(),
//							StartDate: utils.AddToDate(utils.GetNowDateTime(), -5)
							EndDate: '6/19/2013',
							StartDate: '5/19/2013'
						}
					}
				)
			)
			.then(function () {
				// remove existing from the map
				_devices.fmap.removeMarkersByOwnerId('events');
				/** Clear the list. */
				_list.destroyAll();

				_.each(data.events(), function (item) {
					// add to map
					_devices.fmap.addMarker('events', {
						Lattitude: parseFloat(item.Lattitude()),
						Longitude: parseFloat(item.Longitude()),
					});
					// add to list
					item.time = utils.DateLongFormat(item.EventDate());
					item.actions = '';
					_list.push(item);
				});
				}, function (someArg) {
					alert('Retrieving events with SomeArg:' + someArg);
			});
		},
		startEdit = function(vm/*, evt*/) {
			editItem(vm);
			editing(true);
		},
		cancelEdit = function(/*vm, evt*/) {
			editing(false);
		},
		selectItem = function (vm) {
			_devices.fmap.setCenter(
				new gmaps.LatLng(parseFloat(vm.Lattitude()), parseFloat(vm.Longitude())));
		},
		list = [
			{
				EventTypeUi: 'sos',
				EventShortDesc: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				EventTypeUi: 'battery',
				EventShortDesc: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				EventTypeUi: 'speed',
				EventShortDesc: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				EventTypeUi: 'enter',
				EventShortDesc: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				EventTypeUi: 'exit',
				EventShortDesc: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				EventTypeUi: 'fall',
				EventShortDesc: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				EventTypeUi: 'tamper',
				EventShortDesc: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			}
		];

		/** Return object. */
		return {
			init: init,
			TmplName: 'events.view',
			canEdit: ko.observable(false),
			editing: editing,
			editItem: editItem,
			startEdit: startEdit,
			cancelEdit: cancelEdit,
			selectItem: selectItem,
			type: 'events',
			name: 'Events',
			list: _list,
			active: ko.observable(false),
			get Activate() { return _activate; }
		};
	});
