/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 6/5/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'utils',
  'vm.controller'
], function(
  utils,
  ControllerViewModel
) {
  "use strict";

  function SettingsPanelViewModel(options) {
    var _this = this;
    SettingsPanelViewModel.super_.call(_this, options);
  }
  utils.inherits(SettingsPanelViewModel, ControllerViewModel);

  return SettingsPanelViewModel;
});
