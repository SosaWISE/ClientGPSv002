/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'jquery',
	'config',
	'messenger',
	'underscore',
	'datacontext',
	'ko',
	'amplify',
	'vm.model-editor',
	'model.mapper',
	'gmaps'
],
function ($, config, messenger, _, datacontext, ko, amplify, modelEditor, modelMapper, gmaps) {
// wrap in create function in order to create multiple instances
return (function create() {
	var
		/** START Private Properties. */
		saving = ko.observable(false),
		_type = 'devices',
		_list = ko.observableArray(),
		_devices,
		_active = ko.observable(false),
		editorVM = modelEditor.create(),
		_infoWindow,
		/**   END Private Properties. */

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) { callback(); }
		},
		/**   END Private Methods. */

		init = function (devices, cb) {

			_devices = devices;

			amplify.subscribe('customerAuthentication', function (data) {
				console.log(data);
				refresh();
			});
			amplify.subscribe('sessionAuthentication', function (data) {
				console.log(data);
				refresh();
			});

			refresh(cb);
		},
		refresh = function (cb) {
			// remove existing from the map
			_list().forEach(function (model) {
				if (model.handle) {
					model.handle.dispose();
					delete model.handle;
				}
			});
			_list.destroyAll();

			var list = ko.observableArray();
			/** Initialize view model. */
			$.when(
				datacontext.Devices.getData(
					{
						results: list,
						param: {
							UniqueID: datacontext.Customer.model.customerMasterFileId()
						}
					}
				)
			)
			.then(function () {
				_.each(list(), function (model) {
					// add to map
					model.handle = _devices.fmap.addMarker({
						lattitude: parseFloat(model.LastLatt()),
						longitude: parseFloat(model.LastLong())
					}, model.DeviceID(), {
						icon: deviceIcon
					});
					// add to list
					_list.push(model);
				});
				cb();
			}, function (someArg) {
				alert('SomeArg:' + someArg);
				cb();
			});
		},
		deviceIcon = new gmaps.MarkerImage(
			config.IconSprites.GeoMapSprite,
			new gmaps.Size(31, 31),
			new gmaps.Point(31, 31),
			new gmaps.Point(15, 15)
		),
		startEdit = function(model) {
			editorVM.start(model);
		},
		cancelEdit = function() {
			editorVM.stop(true);
		},
		saveEdit = function() {
			if (!editorVM.editing()) {
				return;
			}

			var model = editorVM.model(),
				handle = model.handle;

			editorVM.stop(false);
			saving(true);

			// temporarily delete handle since ko.toJSON can't handle it
			delete model.handle;
			model.saving(true);
			datacontext.Devices.updateData(model, {
				success: function () {
					saving(false);
					model.saving(false);
				},
				error: function () {
					saving(false);
					model.saving(false);
				}
			});
			// add back the handle
			model.handle = handle;
		},
		selectItem = function (model) {
			var latLng;

			latLng = new gmaps.LatLng(parseFloat(model.LastLatt()), parseFloat(model.LastLong()));
			_devices.fmap.setCenter(latLng);

			_list().forEach(function (model) {
				model.active(false);
			});
			model.active(true);

			if (_infoWindow) {
				_infoWindow.close();
			}

			_infoWindow = new gmaps.InfoWindow({
				content: $(document.createElement("div")).html("hello")[0],
				position: latLng
			});
			_infoWindow.open(_devices.fmap);
		},
		_addDevice = function() {
			alert("What up");
			_list.push({
				type: 'Added one',
				title: 'Andresss\'s Watch',
				time: 'April 23, 2013 at 12:42pm'
			});
		};

	/** Return object. */
	//noinspection JSUnusedGlobalSymbols
	return {
		init: init,
		create: create,
		editorVM: editorVM,
		TmplName: 'devices-tab.view',
		canEdit: ko.observable(true),
		editing: editorVM.editing,
		editItem: ko.observable(editorVM),
		selectItem: selectItem,
		saving: saving,
		startEdit: startEdit,
		cancelEdit: cancelEdit,
		saveEdit: saveEdit,
		get refresh() { return refresh; },
		get addDevice() { return _addDevice; },
		type: _type,
		name: 'Devices',
		get list() { return _list; },
		active: _active,
		get Activate() { return _activate; }
	};
})();
});
