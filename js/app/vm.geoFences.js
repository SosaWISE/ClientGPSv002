/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:27 PM
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','messenger','underscore','datacontext','ko','amplify','gmaps'],
function ($, messenger, _, datacontext, ko, amplify, gmaps) {
	var
		/** START Private Properties. */
		editing = ko.observable(false),
		editItem = ko.observable(null),
		_list = ko.observableArray(),
		_devices,
		/**   END Private Properties. */

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) { callback(); }
		},
		/**   END Private Methods. */

		init = function (devices) {
			_devices = devices;
			_list(list);

			/** Bind amplify events to vm. */
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
			/** Init. */
			var geoFences = ko.observableArray();

			/** Load Data. */
			$.when(datacontext.GeoFences.getData({
				results: geoFences,
				param: {
					CMFID: datacontext.Customer.model.customerMasterFileId()
				}
			})).then(
			function () {
				// remove existing from the map
				_devices.fmap.removePolygonsByOwnerId('geofences');
				/** Clear the list. */
				_list.destroyAll();

				/** Build new list. */
				_.each(geoFences(), function(item) {
					// add to map
					_devices.fmap.addGSRectangle('geofences', {
						MinLattitude: item.MinLattitude(),
						MinLongitude: item.MinLongitude(),
						MaxLattitude: item.MaxLattitude(),
						MaxLongitude: item.MaxLongitude(),
					});
					// add to list
					_list.push(item);
				});
			},
			function (someArg) {
				alert('Retrieving Geo Fences has an error with SomeArg:' + someArg);
			});
		},
		startEdit = function(vm, evt) {
			console.log(vm, evt);

			editItem(vm);
			editing(true);
		},
		cancelEdit = function(vm, evt) {
			console.log(vm, evt);

			editing(false);
		},
		selectItem = function (vm) {
			_devices.fmap.setCenter(new gmaps.LatLng(vm.MeanLattitude(), vm.MeanLongitude()));
		},
		list = [
			{
				Type: 'fence',
				GeoFenceNameUi: 'Our House',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Tyler\'s House',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Ethan\'s Apartment',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Mark\'s House',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Carolyn\'s House',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Church',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Our Neighborhood',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Orem, UT',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Utah, USA',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Carolyn\'s Neighborhood',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Our Ward Boundries',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Our Stake Boundries',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Utah Lake',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Texas, USA',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			},
			{
				Type: 'fence',
				GeoFenceNameUi: 'Houston, TX',
				ModifiedOn: 'April 23, 2013 at 12:42pm'
			}
		];

	/** Return object. */
	return {
		init: init,
		TmplName: 'geofences.view',
		canEdit: ko.observable(true),
		editing: editing,
		editItem: editItem,
		startEdit: startEdit,
		cancelEdit: cancelEdit,
		selectItem: selectItem,
		type: 'geofences',
		name: 'Geofences',
		list: _list,
		active: ko.observable(false),
		get Activate() { return _activate; }
	};
});
