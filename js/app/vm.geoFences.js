/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:27 PM
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','messenger','underscore','datacontext','ko','amplify','gmaps','vm.model-editor'],
function ($, messenger, _, datacontext, ko, amplify, gmaps, modelEditor) {
// wrap in create function in order to create multiple instances
return (function create() {
	var
		/** START Private Properties. */
		saving = ko.observable(false),
		_list = ko.observableArray(),
		_devices,
		_active = ko.observable(false),
		editorVM = modelEditor.create(),
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
				_list().forEach(function (model) {
					if (model.handle) {
						model.handle.dispose();
						delete model.handle;
					}
				});
				/** Clear the list. */
				_list.destroyAll();

				/** Build new list. */
				_.each(geoFences(), function(model) {
					// add to map
					model.handle = _devices.fmap.addRectangle(startEdit, model, model.GeoFenceID());
					gmaps.event.addListener(model.handle, "click", function () {
						// this tab must be showing
						if (_active()) {
							startEdit(model);
						}
					});
					// add to list
					_list.push(model);
				});
			},
			function (someArg) {
				alert('Retrieving Geo Fences has an error with SomeArg:' + someArg);
			});
		},
		startEdit = function(model) {
			// we're already editing
			if (editorVM.editing()) {
				return;
			}
			editorVM.start(model);

			selectItem(model);
			model.handle.canEdit(true);
		},
		cancelEdit = function(model) {
			editorVM.stop(true);

			model.handle.canEdit(false);
		},
		saveEdit = function() {
			editorVM.stop(false);
			saving(true);

			var model = editorVM.model(),
				data;

			model.ZoomLevel(_devices.fmap.getZoom());
			model.handle.storeBounds();

			data = {
				GeoFenceID: model.GeoFenceID(),
				SessionID: datacontext.Session.model.SessionID(),//model.SessionID(),
				AccountId: model.AccountId(),
				// CustomerId: model.CustomerId(),
				GeoFenceName: model.GeoFenceNameUi(),
				GeoFenceDescription: model.Description(),
				// ItemId: model.??(),
				ReportModeId: model.ReportModeId(),
				MaxLattitude: model.MaxLattitude(),
				MinLongitude: model.MinLongitude(),
				MaxLongitude: model.MaxLongitude(),
				MinLattitude: model.MinLattitude(),
				ZoomLevel: model.ZoomLevel(),
			};

			model.saving(true);
			datacontext.GeoFences.updateData(data, {
				success: function (response) {
					console.log(response);
					saving(false);
					model.saving(false);
				},
				error: function (response) {
					console.log(response);
					saving(false);
					model.saving(false);
				}
			});
		},
		selectItem = function (model) {
			_devices.fmap.panTo(new gmaps.LatLng(model.MeanLattitude(), model.MeanLongitude()));
			if (_devices.fmap.getZoom() < 13) {
				_devices.fmap.setZoom(13);
			}
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
		editorVM: editorVM,
		canEdit: ko.observable(true),
		editing: editorVM.editing,
		editItem: ko.observable(editorVM),
		startEdit: startEdit,
		cancelEdit: cancelEdit,
		saveEdit: saveEdit,
		selectItem: selectItem,
		type: 'geofences',
		name: 'Geofences',
		list: _list,
		active: _active,
		get Activate() { return _activate; }
	};
})();
});
