/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.devices-tab',
['messenger'],
function (messenger) {
	var
		/** START Private Properties. */
			_tmplName = 'devices.view',
		/**   END Private Properties. */

		/** START Private Methods. */
			_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) callback();
		},
		/**   END Private Methods. */

			init = function () {
			/** Initialize view model. */
		},
		list = [
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'watch',
				title: 'Tyler\'s Watch',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'watch',
				title: 'Ethan\'s Watch',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'child',
				title: 'Zak\'s Child Tracker',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'phone',
				title: 'Austin\'s Phone',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'home',
				title: 'Our Home Alarm',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'watch',
				title: 'Carolyn\'s Phone',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'phone',
				title: 'Mark\'s Phone',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'car-nav',
				title: 'Austin\'s Car GPS',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'car',
				title: 'Carolyn\'s Car Tracker',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm',
			},
		];

	/** Init object. */
	init();

	/** Return object. */
	return {
    type: 'devices',
		name: 'Devices',
		list: list,
		active: ko.observable(false),
		get Activate() { return _activate; },
		get TmplName() { return _tmplName; }
	};
});
