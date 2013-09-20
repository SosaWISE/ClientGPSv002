/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:31 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'utils',
  'vm.controller',
  'ko',
  'dataservice'
], function(
  utils,
  ControllerViewModel,
  ko,
  dataservice
) {
  "use strict";

  function UsersPanelViewModel(options) {
    var _this = this;
    UsersPanelViewModel.super_.call(_this, options);

    _this.editing = ko.observable(false);
    _this.editItem = ko.observable(null);

    // scoped events
    _this.clickEdit = function(vm) {
      _this.startEdit(vm);
    };
    _this.clickCancel = function() {
      _this.cancelEdit();
    };
  }
  utils.inherits(UsersPanelViewModel, ControllerViewModel);


  //
  // members
  //

  UsersPanelViewModel.prototype.onLoad = function(cb) {
    var list = this.list;

    list([]);
    dataservice.Users.getData({}, function(resp) {
      console.log(resp);
      if (resp.Code !== 0) {
        console.log("Error Retrieving Users: " + resp.Message);
        return;
      }

      resp.Value.forEach(function(item) {
        list.push({
          type: item.CustomerTypeUi,
          firstName: item.FirstName,
          lastName: item.LastName,
          time: utils.DateLongFormat(item.LastLoginOn)
        });
      });

      cb();
    });
  };
  UsersPanelViewModel.prototype.onActivate = function() { // overrides base
    this.setTitle(this.name);
  };

  UsersPanelViewModel.prototype.startEdit = function(vm) {
    this.editItem(vm);
    this.editing(true);
  };
  UsersPanelViewModel.prototype.cancelEdit = function() {
    this.editing(false);
  };

  return UsersPanelViewModel;
});
