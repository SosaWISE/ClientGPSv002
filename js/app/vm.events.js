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
				_tmplName = 'events.view',
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
			type: 'events',
			name: 'Events',
			list: list,
			active: ko.observable(false),
			get Activate() { return _activate; },
			get TmplName() { return _tmplName; }
		};
	});
