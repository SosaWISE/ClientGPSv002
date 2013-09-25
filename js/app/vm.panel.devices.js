define([
  'utils',
  'ko',
  'flowMap/index',
  'gmaps',
  'vm.controller',
  'vm.events',
  'vm.devices',
  'vm.geofences'
], function(
  utils,
  ko,
  flowMap,
  gmaps,
  ControllerViewModel,
  EventsViewModel,
  DevicesViewModel,
  GeofencesViewModel
) {
  "use strict";

  function DevicesPanelViewModel(options) {
    var _this = this;
    DevicesPanelViewModel.super_.call(_this, options);

    _this.viewTemplate = 'devices.view';
    _this.moduleTemplate = 'devices.module.view';

    _this.defaultChild = 'devices';
    _this.list([
      new EventsViewModel({
        parent: _this,
        id: 'events',
        name: 'Events',
      }),
      new DevicesViewModel({
        parent: _this,
        id: 'devices',
        name: 'Devices',
      }),
      new GeofencesViewModel({
        parent: _this,
        id: 'geofences',
        name: 'Geofences',
      })
    ]);

    // scoped events
    _this.clickItem = function(vm) {
      _this.selectItem(vm);
    };
  }
  utils.inherits(DevicesPanelViewModel, ControllerViewModel);

  DevicesPanelViewModel.prototype.onLoad = function(cb) {
    var _this = this;
    setTimeout(function() {
      //@TODO: move map creation elsewhere
      _this.fmap = new flowMap.Map(document.getElementById("devices-map"), {
        //@TODO: dynamically set initial center and zoom
        center: new gmaps.LatLng(40.323110654354856, -111.68210183710936),
        zoom: 14,

        mapTypeId: gmaps.MapTypeId.ROADMAP,
        zoomControl: true,
        //zoomControlOptions: { style: gmaps.ZoomControlStyle.SMALL },
        scaleControl: true,
        mapTypeControl: true,
        disableDefaultUI: true
      });
      _this.fmap.inEditMode = true;

      cb(true);
    }, 200);
  };
  DevicesPanelViewModel.prototype.selectItem = function(vm) {
    var routeData = vm.lastRouteData || {};
    routeData.tab = vm.id;
    this.goToRoute(routeData);
  };

  return DevicesPanelViewModel;
});
