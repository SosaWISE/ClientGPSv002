define([
  'config',
  'utils',
  'ko',
  'vm.controller',
  'dataservice',
  'model.device',
  'vm.model-editor',
  'gmaps',
  'resources'
], function(
  config,
  utils,
  ko,
  ControllerViewModel,
  dataservice,
  model_device,
  modelEditor,
  gmaps,
  resources
) {
  "use strict";

  function DevicesViewModel(options) {
    var _this = this;
    DevicesViewModel.super_.call(_this, options);

    _this.saving = ko.observable(false);
    _this.canEdit = ko.observable(true);
    _this.editorVM = modelEditor.create();
    _this.editing = _this.editorVM.editing;
    _this.editItem = ko.observable(_this.editorVM);

    // scoped events
    _this.clickItem = function(model) {
      _this.selectItem(model, false, false);
      return true;
    };
    _this.clickEdit = function(model) {
      _this.startEdit(model);
    };
    _this.clickSave = function(model) {
      _this.saveEdit(model);
    };
    _this.clickCancel = function(model) {
      _this.cancelEdit(model);
    };
  }
  utils.inherits(DevicesViewModel, ControllerViewModel);
  DevicesViewModel.prototype.viewTemplate = 'devices-tab.view';


  //
  // members
  //

  DevicesViewModel.prototype.onLoad = function(cb) {
    var list = this.list,
      fmap = this.parent.fmap;

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
    dataservice.Devices.getData({
      UniqueID: config.CurrentUser().CustomerMasterFileId,
    }, function(resp) {
      if (resp.Code !== 0) {
        alert('Error loading devices:' + resp);
      } else {
        var collectionName = 'devices';
        resp.Value.forEach(function(model) {
          model = model_device.wrap(model, collectionName);
          model.handles = {};

          // add to map
          model.handles.marker = fmap.addMarker({
            lattitude: parseFloat(model.LastLatt()),
            longitude: parseFloat(model.LastLong())
          }, model.AccountId(), {
            icon: DevicesViewModel.deviceIcon
          });

          var latLng = new gmaps.LatLng(parseFloat(model.LastLatt()), parseFloat(model.LastLong())),
            div = document.createElement("div");
          div.innerHTML = 'device';
          model.handles.infoWindow = new gmaps.InfoWindow({
            content: div,
            position: latLng,
          });
          model.active.subscribe(function(active) {
            if (active) {
              gmaps.event.addListener(model.handles.infoWindow, "closeclick", function() {
                model.active(false);
              });
              model.handles.infoWindow.open(fmap);
            } else {
              gmaps.event.clearInstanceListeners(model.handles.infoWindow);
              model.handles.infoWindow.close();
            }
          });

          // add to list
          list.push(model);
        });
      }
      cb(false);
    });
  };
  DevicesViewModel.prototype.onActivate = function(routeData) { // overrides base
    var child = this.findChild(parseInt(routeData.id, 10));
    if (!child) {
      this.removeExtraRouteData(routeData);
    } else {
      this.selectItem(child);
      if (routeData.action) {
        switch (routeData.action) {
          case 'edit':
            //@TODO: start edit
            console.log('editing ', routeData.id);
            break;
          case 'view':
            console.log('viewing ', routeData.id);
            break;
          default:
            delete routeData.action;
            break;
        }
      }
    }
    return routeData;
  };

  DevicesViewModel.prototype.selectItem = function(model, preventDeactivate) {
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

    this.setRouteData({
      tab: this.id,
      id: this.activeChild.id,
    });
  };

  DevicesViewModel.prototype.addDevice = function() {
    alert("What up");
    this.list.push({
      type: 'Added one',
      title: 'Andresss\'s Watch',
      time: 'April 23, 2013 at 12:42pm'
    });
  };
  DevicesViewModel.prototype.startEdit = function(model) {
    this.editorVM.start(model);
  };
  DevicesViewModel.prototype.cancelEdit = function() {
    this.editorVM.stop(true);
  };
  DevicesViewModel.prototype.saveEdit = function() {
    if (!this.editorVM.editing()) {
      return;
    }

    var _this = this,
      model = _this.editorVM.model();
    _this.editorVM.stop(false);

    _this.saving(true);
    model.saving(true);
    dataservice.Devices.updateData(model.getValue(), function(resp) {
      _this.saving(false);
      model.saving(false);

      if (resp.Code !== 0) {
        console.error(resp);
        _this.editorVM.start(model);
      } else {
        model.markClean(resp.Value, true);
      }
    });
  };

  DevicesViewModel.deviceIcon = new gmaps.MarkerImage(
    resources.IconSprites.GeoMapSprite,
    new gmaps.Size(31, 31),
    new gmaps.Point(31, 31),
    new gmaps.Point(15, 15)
  );

  return DevicesViewModel;
});
