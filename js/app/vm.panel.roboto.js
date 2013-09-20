define([
  'utils',
  'vm.controller'
], function(
  utils,
  ControllerViewModel
) {
  "use strict";

  function RobotoPanelViewModel(options) {
    var _this = this;
    RobotoPanelViewModel.super_.call(_this, options);
  }
  utils.inherits(RobotoPanelViewModel, ControllerViewModel);

  RobotoPanelViewModel.prototype.onLoad = function(cb) {
    cb(false);

    var i,
      list = this.list,
      n = 0;
    setInterval(function() {
      var start = n,
        nums = [];
      for (i = 0; i < 32; i++) {
        nums.push(n);
        n++;
      }
      list.push({
        start: start,
        nums: nums,
      });
    }, 10);
  };
  RobotoPanelViewModel.prototype.onActivate = function() { // overrides base
    this.setTitle(this.name);
  };

  return RobotoPanelViewModel;
});
