/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:36 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.events',
	['messenger'],
	function (messenger) {
		var
			/** START Private Properties. */
		editing = ko.observable(false),
		editItem = ko.observable(null),
		/**	 END Private Properties. */

			/** START Private Methods. */
				_activate = function (routeData, callback) {
				messenger.publish.viewModelActivated();
			if (callback) callback();
			},
			/**	 END Private Methods. */

				init = function () {
				/** Initialize view model. */
			},
			startEdit = function(vm, evt) {
				editItem(vm);
				editing(true);
			},
			cancelEdit = function(vm, evt) {
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
			list: list,
			active: ko.observable(false),
			get Activate() { return _activate; }
		};
	});
