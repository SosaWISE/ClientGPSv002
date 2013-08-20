/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:27 PM
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','messenger','underscore','datacontext','ko','amplify','gmaps','vm.model-editor','model.geoFence'],
function ($, messenger, _, datacontext, ko, amplify, gmaps, modelEditor, GeoFenceModel) {
// wrap in create function in order to create multiple instances
return (function create() {
	var
		/** START Private Properties. */
		saving = ko.observable(false),
		_type = 'geofences',
		_list = ko.observableArray(),
		_devices,
		_active = ko.observable(false),
		editorVM = modelEditor.create(),
		/**	 END Private Properties. */

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) { callback(); }
		},
		/**	 END Private Methods. */

		init = function (devices, cb) {
			_devices = devices;

			/** Bind amplify events to vm. */
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
					addGeoFenceRectangle(model);
					// add to list
					_list.push(model);
				});

				cb();
			},
			function (someArg) {
				alert('Retrieving Geo Fences has an error with SomeArg:' + someArg);
				cb();
			});
		},
		addGeoFenceRectangle = function (model) {
			// add to map
			model.handle = _devices.fmap.addRectangle(startEdit, model, model.GeoFenceID());
			gmaps.event.addListener(model.handle, "click", function () {
				// this tab must be showing
				if (!_active()) {
					_devices.activateTab(_type);
				}
				startEdit(model, null, true);
			});
		},
		startEdit = function(model, evt, preventFocus) {
			// we're already editing
			if (editorVM.editing()) {
				return;
			}

			editorVM.start(model);

			selectItem(model, evt, preventFocus);
			model.handle.canEdit(true);
		},
		cancelEdit = function(model) {
			editorVM.stop(true);
			if (model.GeoFenceID()) {
				// cancel edit
				model.handle.canEdit(false);
				model.handle.resetBounds();
			} else {
				// cancel add
				model.handle.dispose();
				delete model.handle;
			}
		},
		saveEdit = function() {
			if (!editorVM.editing()) {
				return;
			}

			var model = editorVM.model(),
				handle = model.handle;

			editorVM.stop(false);
			model.handle.canEdit(false);
			saving(true);

			model.ZoomLevel(_devices.fmap.getZoom());
			model.handle.storeBounds();

			model.SessionID(datacontext.Session.model.SessionID());
			model.ItemId('Junk');

			// temporarily delete handle since ko.toJSON can't handle it
			delete model.handle;
			model.saving(true);
			datacontext.GeoFences.updateData(model, {
				success: function (response) {
					console.log(response);
					saving(false);
					model.saving(false);
					if (response.Code === 0) {
						if (!model.GeoFenceID()) {
							model.GeoFenceID(response.Value.GeoFenceID);
							_list.push(model);
						}
					} else {
						startEdit(model);
						window.alert(response.Message);
					}
				},
				error: function (response) {
					console.log(response);
					saving(false);
					model.saving(false);
				}
			});
			// add back the handle
			model.handle = handle;
		},
		selectItem = function (model, evt, preventFocus) {
			if (!preventFocus) {
				_devices.fmap.panTo(new gmaps.LatLng(model.MeanLattitude(), model.MeanLongitude()));
				var zoomLevel = model.ZoomLevel();
				if (zoomLevel) {
					_devices.fmap.setZoom(zoomLevel);
				}
			}

			_list().forEach(function (model) {
				model.active(false);
			});
			model.active(true);
		},
		startAddItem = function () {
			var model = new GeoFenceModel(),
				center = _devices.fmap.getCenter(),
				offset = 0.0002;
			model.AccountId(_list()[0].AccountId());//@HACK: fix me
			model.MeanLattitude(center.lat());
			model.MeanLongitude(center.lng());
			model.MinLattitude(center.lat()-offset);
			model.MinLongitude(center.lng()-offset);
			model.MaxLattitude(center.lat()+offset);
			model.MaxLongitude(center.lng()+offset);
			addGeoFenceRectangle(model);
			startEdit(model);
		};

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
		startAddItem: startAddItem,
		type: _type,
		name: 'Geofences',
		list: _list,
		active: _active,
		get Activate() { return _activate; }
	};
})();
});
