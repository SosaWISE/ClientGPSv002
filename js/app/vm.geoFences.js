/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:27 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.geoFences',
['messenger'],
function (messenger) {
	var
		/** START Private Properties. */
		editing = ko.observable(false),
		editItem = ko.observable(null),
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
		startEdit = function(vm, evt) {
			editItem(vm);
			editing(true);
		},
		cancelEdit = function(vm, evt) {
			editing(false);
		},
		list = [
			{
				type: 'fence',
				title: 'Our House',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Tyler\'s House',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Ethan\'s Apartment',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Mark\'s House',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Carolyn\'s House',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Church',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Our Neighborhood',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Orem, UT',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Utah, USA',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Carolyn\'s Neighborhood',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Our Ward Boundries',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Our Stake Boundries',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Utah Lake',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Texas, USA',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'fence',
				title: 'Houston, TX',
				time: 'April 23, 2013 at 12:42pm',
			},
		];

	/** Init object. */
	init();

	/** Return object. */
	return {
		TmplName: 'geofences.view',
		canEdit: ko.observable(true),
		editing: editing,
		editItem: editItem,
		startEdit: startEdit,
		cancelEdit: cancelEdit,
		type: 'geofences',
		name: 'Geofences',
		list: list,
		active: ko.observable(false),
		get Activate() { return _activate; }
	};
});
