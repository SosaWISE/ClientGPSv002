define([
  'utils',
  'ko',
  'resources',
  'flowMap/index',
  'gmaps',
  'vm.controller',
  'vm.events',
  'vm.devices',
  'vm.geofences'
], function(
  utils,
  ko,
  resources,
  flowMap,
  gmaps,
  ControllerViewModel,
  EventsViewModel,
  DevicesViewModel,
  GeoFencesViewModel
) {
  "use strict";

  function DevicesPanelViewModel(options) {
    DevicesPanelViewModel.super_.call(this, options);

    this.hash = resources.Hashes.devices;
    this.type = 'devices';
    this.ico = '&#59176;';
    this.name = 'Devices';
    this.viewTemplate = 'devices.view';
    this.moduleTemplate = 'devices.module.view';

    this.defaultChild = 'devices';
    this.list([
      new EventsViewModel({
        parent: this,
        id: 'events',
        name: 'Events',
      }),
      new DevicesViewModel({
        parent: this,
        id: 'devices',
        name: 'Devices',
      }),
      new GeoFencesViewModel({
        parent: this,
        id: 'geofences',
        name: 'Geofences',
      })
    ]);

    // ensure correct scope
    this.selectItem = this.selectItem.bind(this);
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
    this.goTo(routeData);
  };

  return DevicesPanelViewModel;
});
