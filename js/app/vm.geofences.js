/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:27 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'config',
  'dataservice',
  'ko',
  'gmaps',
  'vm.model-editor',
  'utils',
  'model.geoFence',
  'vm.controller'
], function(
  config,
  dataservice,
  ko,
  gmaps,
  modelEditor,
  utils,
  model_geofence,
  ControllerViewModel
) {
  "use strict";

  function GeofencesViewModel(options) {
    GeofencesViewModel.super_.call(this, options);

    this.canEdit = ko.observable(true);
    this.editorVM = modelEditor.create();
    this.editing = this.editorVM.editing;
    this.editItem = ko.observable(this.editorVM);

    this.saving = ko.observable(false);
    this.type = 'geofences';

    // ensure correct scope
    this.clickItem = this.clickItem.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
    this.clickSave = this.clickSave.bind(this);
    this.clickCancel = this.clickCancel.bind(this);
  }
  utils.inherits(GeofencesViewModel, ControllerViewModel);
  GeofencesViewModel.prototype.viewTemplate = 'geofences.view';

  //
  // events
  //
  GeofencesViewModel.prototype.clickItem = function(model) {
    this.selectItem(model, false, false);
    return true;
  };
  GeofencesViewModel.prototype.clickEdit = function(model) {
    this.startEdit(model);
  };
  GeofencesViewModel.prototype.clickSave = function(model) {
    this.saveEdit(model);
  };
  GeofencesViewModel.prototype.clickCancel = function(model) {
    this.cancelEdit(model);
  };

  //
  // members
  //
  GeofencesViewModel.prototype.onLoad = function(cb) {
    var _this = this,
      list = this.list;

    // remove existing from the map
    list().forEach(function(model) {
      Object.keys(model.handles).forEach(function(handle) {
        handle.dispose();
      });
      delete model.handles;
    });
    // clear list
    list([]);
    // add to list
    dataservice.GeoFences.getData({
      CMFID: config.CurrentUser().CustomerMasterFileId,
    }, function(resp) {
      if (resp.Code !== 0) {
        alert('Retrieving Geo Fences has an error:' + resp.Message);
        cb();
      } else {
        var collectionName = 'geofences';
        resp.Value.forEach(function(model) {
          //@TODO: make model observable
          model = model_geofence.wrap(model, collectionName);

          _this.addGeoFenceRectangle(model);
          // add to list
          list.push(model);
        });
      }
      cb();
    });
  };
  GeofencesViewModel.prototype.onActivate = function(routeData) { // overrides base
    var child = this.findChild(parseInt(routeData.id, 10));
    if (!child) {
      this.removeExtraRouteData(routeData);
    } else {
      this.selectItem(child, true, false);
      routeData.action = 'view';
    }
    return routeData;
  };
  GeofencesViewModel.prototype.addGeoFenceRectangle = function(model) {
    var _this = this;

    model.handles = {};
    // add to map
    model.handles.rect = this.parent.fmap.addRectangle(_this.clickEdit, model, model.GeoFenceID());
    gmaps.event.addListener(model.handles.rect, "click", function() {
      // this tab must be showing
      if (!_this.active()) {
        // _devices.activateTab(_type);
      }
      _this.startEdit(model, true);
    });
  };
  GeofencesViewModel.prototype.startEdit = function(model, preventFocus) {
    // we're already editing
    if (this.editorVM.editing()) {
      return;
    }

    this.editorVM.start(model);

    this.selectItem(model, true, preventFocus);
    model.handles.rect.canEdit(true);
  };
  GeofencesViewModel.prototype.cancelEdit = function(model) {
    this.editorVM.stop(true);
    if (model.GeoFenceID()) {
      // cancel edit
      model.handles.rect.canEdit(false);
      model.handles.rect.resetBounds();
    } else {
      // cancel add
      model.handles.rect.dispose();
      delete model.handles.rect;
    }
  };
  GeofencesViewModel.prototype.saveEdit = function() {
    if (!this.editorVM.editing()) {
      return;
    }

    var _this = this,
      model = this.editorVM.model(),
      data;

    this.editorVM.stop(false);
    model.handles.rect.canEdit(false);
    this.saving(true);

    model.ZoomLevel(this.parent.fmap.getZoom());
    model.handles.rect.storeBounds();

    // temporarily delete handle since ko.toJSON can't handle it
    model.saving(true);

    data = model.getValue();
    // map fields to what the server is expecting
    // (the server should serve them in the manner is expects them)
    data.ReportMode = data.ReportModeId;
    data.GeoFenceName = data.GeoFenceNameUi;
    // add other stuff
    // (server should get SessionID from querystring)
    data.SessionID = dataservice.Session.sessionID();
    data.ItemId = 'Junk';
    // remove unwanted stuff
    delete data.ModifiedOn;
    dataservice.GeoFences.updateData(data, function(resp) {
      console.log(resp);

      _this.saving(false);
      model.saving(false);

      if (resp.Code !== 0) {
        window.alert(resp.Message);
        _this.startEdit(model);
      } else if (model.GeoFenceID()) {
        model.markClean(resp.Value, true);
      } else {
        // new geo fence
        model.GeoFenceID(resp.Value.GeoFenceID);
        model.markClean(resp.Value, true);
        _this.list.push(model);
      }
    });
  };
  GeofencesViewModel.prototype.selectItem = function(model, preventDeactivate, preventFocus) {
    if (this.activeChild) {
      this.activeChild.deactivate();
      if (!preventDeactivate && this.activeChild === model) {
        this.activeChild = null;
        // deselect item
        this.setRouteData({
          tab: this.id,
        });
        return;
      }
    }
    this.activeChild = model;
    this.activeChild.activate();

    if (!preventFocus) {
      this.parent.fmap.panTo(new gmaps.LatLng(model.MeanLattitude(), model.MeanLongitude()));
      var zoomLevel = model.ZoomLevel();
      if (zoomLevel) {
        this.parent.fmap.setZoom(zoomLevel);
      }
    }

    this.setRouteData({
      tab: this.id,
      id: this.activeChild.id,
    });
  };
  GeofencesViewModel.prototype.startAddItem = function() {
    var model = model_geofence.wrap({}),
      center = this.parent.fmap.getCenter(),
      offset = 0.0002;
    model.AccountId(this.list()[0].AccountId()); //@HACK: fix me
    model.MeanLattitude(center.lat());
    model.MeanLongitude(center.lng());
    model.MinLattitude(center.lat() - offset);
    model.MinLongitude(center.lng() - offset);
    model.MaxLattitude(center.lat() + offset);
    model.MaxLongitude(center.lng() + offset);
    this.addGeoFenceRectangle(model);
    this.startEdit(model);
  };

  return GeofencesViewModel;
});
