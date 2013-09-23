define([
  'jquery',
  'ko',
  'utils',
  'vm.controller'
], function(
  $,
  ko,
  utils,
  ControllerViewModel
) {
  "use strict";

  ko.bindingHandlers.utf8 = {
    init: function(element, valueAccessor) {
      // $(element).html('&#' + valueAccessor().toString(16) + ';');
      $(element).html('&#' + valueAccessor() + ';');
    },
  };

  function RobotoPanelViewModel(options) {
    var _this = this;
    RobotoPanelViewModel.super_.call(_this, options);
  }
  utils.inherits(RobotoPanelViewModel, ControllerViewModel);

  RobotoPanelViewModel.prototype.onLoad = function(cb) {
    var i,
      list = this.list,
      offset = parseInt('0xe000', 16),
      n = 0,
      interval;
    interval = setInterval(function() {
      var start = n + offset,
        nums = [];
      for (i = 0; i < 32; i++) {
        nums.push(n + offset);
        n++;
      }
      list.push({
        start: start,
        nums: nums,
      });

      if (n > 3000) {
        clearInterval(interval);
      }
    }, 10);

    cb(false);
  };
  RobotoPanelViewModel.prototype.onActivate = function() { // overrides base
    this.setTitle(this.name);
  };

  return RobotoPanelViewModel;
});
