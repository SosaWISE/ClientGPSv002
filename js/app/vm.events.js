/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:36 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.events',
	['messenger','underscore','datacontext','ko','amplify','utils'],
	function (messenger, _, datacontext, ko, amplify, utils) {
		var
			/** START Private Properties. */
		editing = ko.observable(false),
		editItem = ko.observable(null),
		_list = ko.observableArray(),
		/**	 END Private Properties. */

		/** START Private Methods. */
			_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
		if (callback) callback();
		},

		/**	 END Private Methods. */

		init = function () {
			_list(list);
			amplify.subscribe('customerAuthentication', function (data) {
				console.log(data);
				refresh();
			});
			amplify.subscribe('sessionAuthentication', function (data) {
				console.log(data);
				refresh();
			});
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
			.then(function (response) {
				/** Init. */
				console.log(response);

				_list.destroyAll();
				_.each(data.events(), function (item) {
					_list.push({
						type: item.UiType(),
						title: 'Rascal exited the Yard geo fence',
						time: utils.DateLongFormat(item.EventDate()),
						//time: 'July 1, 2013 at 1:59pm',
						actions: ''
					});
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
		list = [
			{
				type: 'sos',
				title: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				type: 'battery',
				title: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				type: 'speed',
				title: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				type: 'enter',
				title: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				type: 'exit',
				title: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				type: 'fall',
				title: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			},
			{
				type: 'tamper',
				title: 'Rascal exited the Yard geofence',
				time: 'April 23, 2013 at 12:42pm',
				actions: ''
			}
		];

		/** Init object. */
		init();

		/** Return object. */
		return {
			TmplName: 'events.view',
			canEdit: ko.observable(false),
			editing: editing,
			editItem: editItem,
			startEdit: startEdit,
			cancelEdit: cancelEdit,
			type: 'events',
			name: 'Events',
			list: _list,
			active: ko.observable(false),
			get Activate() { return _activate; }
		};
	});
