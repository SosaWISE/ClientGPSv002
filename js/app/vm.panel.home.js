/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/24/13
 * Time: 5:15 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'notify',
  'utils',
  'vm.controller',
  'ko',
  'config',
  'dataservice'
], function(
  notify,
  utils,
  ControllerViewModel,
  ko,
  config,
  dataservice
) {
  "use strict";

  function HomePanelViewModel(options) {
    var _this = this;
    HomePanelViewModel.super_.call(_this, options);

    _this.editing = ko.observable(false);
    _this.editItem = ko.observable(null);
    _this.devices = ko.observableArray();
    _this.events = ko.observableArray();

    //@TODO: move deviceTypes to settings????
    _this.deviceTypes = ko.observableArray([
      {
        type: 'home',
        name: 'Home Security System (KinTouch TM)'
      },
      {
        type: 'car-nav',
        name: 'Car Navigation System (Encompass TM)'
      },
      {
        type: 'bracelet',
        name: 'Health Care Bracelet'
      },
      {
        type: 'phone',
        name: 'Mobile Phone Application'
      },
      {
        type: 'child',
        name: 'Child GPS Tracker'
      },
      {
        type: 'pet',
        name: 'Pet GPS Tracker'
      },
      {
        type: 'car',
        name: 'Automobile Tracker'
      },
      {
        type: 'watch',
        name: 'GPS Watch Tracker'
      }
    ]);
    _this.deviceTypes().forEach(function(deviceType) {
      deviceType.cmdAddDevice = ko.command(
        function(cb) {
          // currently does nothing
          cb();
        }
      );
    });

    // scoped events
    _this.clickDevice = function(model) {
      _this.goToRoute({
        route: 'devices',
        tab: 'devices',
        id: model.AccountId,
      });
    };
    _this.clickEvent = function(model) {
      _this.goToRoute({
        route: 'devices',
        tab: 'events',
        id: model.EventID,
      });
    };
  }
  utils.inherits(HomePanelViewModel, ControllerViewModel);

  HomePanelViewModel.prototype.onLoad = function(cb) {
    var _this = this,
      waitingCount = 2;

    function done() {
      waitingCount--;
      if (waitingCount) {
        return;
      }

      if (typeof(cb) === 'function') {
        cb();
      }
    }

    dataservice.Devices.getData({
      UniqueID: config.user().CustomerMasterFileId,
    }, function(resp) {
      console.log(resp);
      if (resp.Code !== 0) {
        return;
      }

      _this.devices([]);
      resp.Value.forEach(function(item) {
        _this.devices.push(item);
      });

      done();
    });

    dataservice.Events.getData({
      CMFID: config.user().CustomerMasterFileId,
      PageSize: 10,
      // EndDate: utils.GetNowDateTime(),
      // StartDate: utils.AddToDate(utils.GetNowDateTime(), -5)
      EndDate: '6/19/2013',
      StartDate: '1/19/2013'
    }, function(resp) {
      console.log(resp);
      if (resp.Code !== 0) {
        return;
      }

      _this.events([]);
      resp.Value.forEach(function(item) {
        item.time = utils.DateWithFormat(item.EventDate, 'MMMM Do, YYYY @ hh:mm:ss a');
        item.actions = '';

        _this.events.push(item);
      });

      done();
    });
  };
  HomePanelViewModel.prototype.onActivate = function() { // overrides base
    this.setTitle(this.name);

    var _this = this;
    notify.notify('fence', '/devices/devices/100169/edit', 0, {
      view: function() {
        _this.goToRoute({
          route: 'devices',
          tab: 'devices',
          id: 100169,
          action: 'edit',
        });
      },
    });
    notify.notify('fence', '/devices/devices/100203/edit', 0, {
      view: function() {
        _this.goToRoute({
          route: 'devices',
          tab: 'devices',
          id: 100203,
          action: 'edit',
        });
      },
    });

    // notify.counter = 0;
    // setInterval(function() {
    //   notify.counter++;
    //   notify.notify('type', 'message ' + notify.counter, 6);
    // }, 1000 * 1);
  };
  return HomePanelViewModel;
});
