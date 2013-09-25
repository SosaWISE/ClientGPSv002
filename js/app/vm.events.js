/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:36 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'config',
  'dataservice',
  'ko',
  'utils',
  'gmaps',
  'vm.controller'
], function(
  config,
  dataservice,
  ko,
  utils,
  gmaps,
  ControllerViewModel
) {
  "use strict";

  function EventsViewModel(options) {
    var _this = this;
    EventsViewModel.super_.call(_this, options);

    _this.canEdit = ko.observable(false);
    _this.editing = ko.observable(false);
    _this.editItem = ko.observable(null);

    // scoped events
    _this.clickItem = function(model) {
      _this.selectItem(model);
    };
  }
  utils.inherits(EventsViewModel, ControllerViewModel);
  EventsViewModel.prototype.viewTemplate = 'events.view';

  //
  // members
  //
  EventsViewModel.prototype.onLoad = function(cb) {
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
    dataservice.Events.getData({
      CMFID: config.user().CustomerMasterFileId,
      PageSize: 10,
      // EndDate: utils.GetNowDateTime(),
      // StartDate: utils.AddToDate(utils.GetNowDateTime(), -5)
      EndDate: '6/19/2013',
      StartDate: '5/19/2013'
    }, function(resp) {
      if (resp.Code !== 0) {
        alert('Retrieving events:' + resp.Message);
      } else {
        if (!resp.Value.length) {
          console.error('no events returned');
        }

        resp.Value.forEach(function(model) {
          model.handles = {};

          // add to map
          model.handles.marker = fmap.addMarker({
            lattitude: parseFloat(model.Lattitude()),
            longitude: parseFloat(model.Longitude()),
          }, model.EventID(), {
            icon: EventsViewModel.eventIcon,
          });

          var latLng = new gmaps.LatLng(parseFloat(model.Lattitude()), parseFloat(model.Longitude())),
            div = document.createElement("div");
          div.innerHTML = 'event';
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
          model.time = utils.DateLongFormat(model.EventDate());
          model.actions = '';
          list.push(model);
        });
      }
      cb(false);
    });
  };
  EventsViewModel.prototype.onActivate = function(routeData) { // overrides base
    var child = this.findChild(parseInt(routeData.id, 10));
    if (!child) {
      this.removeExtraRouteData(routeData);
    } else {
      this.selectItem(child);
      routeData.action = 'view';
    }
    return routeData;
  };
  EventsViewModel.prototype.startEdit = function(vm /*, evt*/ ) {
    this.editItem(vm);
    this.editing(true);
  };
  EventsViewModel.prototype.cancelEdit = function( /*vm, evt*/ ) {
    this.editing(false);
  };
  EventsViewModel.prototype.selectItem = function(model) {
    if (this.activeChild) {
      this.activeChild.deactivate();
      if (this.activeChild === model) {
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

    this.parent.fmap.setCenter(model.handles.infoWindow.getPosition());

    this.setRouteData({
      tab: this.id,
      id: this.activeChild.id,
    });
  };


  //
  // statics
  //

  EventsViewModel.eventIcon = new gmaps.MarkerImage(
    "/img/social-login-sprite.png",
    new gmaps.Size(31, 31),
    new gmaps.Point(62, 31),
    new gmaps.Point(15, 15)
  );

  return EventsViewModel;
});
