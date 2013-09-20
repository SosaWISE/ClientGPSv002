/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 6/3/13
 * Time: 9:43 AM
 * To change this template use File | Settings | File Templates.
 */
define([
  'utils',
  'vm.controller',
  'ko'
], function(
  utils,
  ControllerViewModel,
  ko
) {
  "use strict";

  function BillingPanelViewModel(options) {
    var _this = this;
    BillingPanelViewModel.super_.call(_this, options);

    _this.list([
      {
        type: 'billing',
        invoiceID: 234562,
        time: 'Mar 3, 2013',
        billStatus: 'Past Due 120+'
      },
      {
        type: 'billing',
        invoiceID: 234342,
        time: 'Apr 3, 2013',
        billStatus: 'Past Due 90'
      },
      {
        type: 'billing',
        invoiceID: 234342,
        time: 'May 3, 2013',
        billStatus: 'Paid (5/4/2013)'
      }
    ]);
    _this.editItem = ko.observable(null);
  }
  utils.inherits(BillingPanelViewModel, ControllerViewModel);

  BillingPanelViewModel.prototype.onActivate = function() { // overrides base
    this.setTitle(this.name);
  };

  return BillingPanelViewModel;
});
