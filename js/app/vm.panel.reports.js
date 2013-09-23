/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 6/4/13
 * Time: 3:00 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'utils',
  'vm.controller',
  'ko',
  'config',
  'resources',
  'dataservice'
], function(
  utils,
  ControllerViewModel,
  ko,
  config,
  resources,
  dataservice
) {
  "use strict";

  function ReportsPanelViewModel(options) {
    var _this = this;
    ReportsPanelViewModel.super_.call(_this, options);

    _this.Devices = ko.observableArray();
    _this.EventTypes = ko.observableArray();
    _this.Locations = ko.observableArray();
  }
  utils.inherits(ReportsPanelViewModel, ControllerViewModel);

  ReportsPanelViewModel.prototype.onLoad = function(cb) {
    var cbCount = 0;

    function checkLoaded() {
      cbCount--;
      if (cbCount === 0) {
        cb();
      }
    }

    if (!this.Devices().length) {
      cbCount++;
      this.loadDevices(checkLoaded);
    }
    if (!this.EventTypes().length) {
      cbCount++;
      this.loadEventTypes(checkLoaded);
    }
    if (!this.Locations().length) {
      cbCount++;
      this.loadLocations(checkLoaded);
    }

    checkLoaded();
  };
  ReportsPanelViewModel.prototype.onActivate = function() { // overrides base
    this.setTitle(this.name);
  };

  //		_Devices = [
  //			{ name: '[Select One]', id: 1 , disable: ko.observable(true) },
  //			{ name: 'My Baby Bro', id: 1 , disable: ko.observable(false) },
  //			{ name: 'Sandra\'s B', id: 2 , disable: ko.observable(false) }
  //		],
  ReportsPanelViewModel.prototype.SetDeviceOptionDisable = function(option, item) {
    ko.applyBindingsToNode(option, {
      disable: item.disable
    }, item);
  };


  ReportsPanelViewModel.prototype.loadDevices = function(cb) {
    var list = this.Devices;
    dataservice.Devices.getData({
      UniqueID: config.user().CustomerMasterFileId,
    }, function(resp) {
      if (resp.Code !== 0) {
        alert('Error loading devices: ' + resp.Message);
      } else {
        /** Add to DDL. */
        list.push({
          name: resources.LocalText.AllDevices,
          id: 0,
          disable: ko.observable(false)
        });
        resp.Value.forEach(function(model) {
          list.push({
            name: model.DeviceName,
            id: model.AccountId,
            disable: ko.observable(false)
          });
        });
      }
      cb();
    });
  };
  ReportsPanelViewModel.prototype.loadEventTypes = function(cb) {
    var list = this.EventTypes;
    dataservice.EventTypes.getData({}, function(resp) {
      if (resp.Code !== 0) {
        alert('Error loading event types: ' + resp.Message);
      } else {
        list.push({
          name: resources.LocalText.AllEventTypes,
          id: 0,
          disable: ko.observable(false)
        });
        resp.Value.forEach(function(model) {
          list.push({
            name: model.EventType,
            id: model.EventTypeID,
            disabled: ko.observable(false)
          });
        });
      }
      cb();
    });
  };
  ReportsPanelViewModel.prototype.loadLocations = function(cb) {
    var list = this.Locations;
    dataservice.Geofences.getData({
      CMFID: config.user().CustomerMasterFileId,
    }, function(resp) {
      if (resp.Code !== 0) {
        alert('Error loading locations: ' + resp.Message);
      } else {
        list.push({
          name: resources.LocalText.AllLocations,
          id: 0,
          disable: ko.observable(false)
        });
        resp.Value.forEach(function(model) {
          list.push({
            name: model.GeoFenceName,
            id: model.GeoFenceID,
            disable: ko.observable(false)
          });
        });
      }
      cb();
    });
  };


  return ReportsPanelViewModel;
});
