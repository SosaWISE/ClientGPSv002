define([
  'ko'
], function(
  ko
) {
  "use strict";

  function BaseViewModel(options) {
    if (options) {
      delete options.active;
      ko.utils.extend(this, options);
    }

    this.active = ko.observable(false);
    // this.saving = ko.observable(false);
  }
  BaseViewModel.prototype.name = null;
  BaseViewModel.prototype.viewTemplate = null;
  BaseViewModel.prototype.booleanOptions = [true, false];

  //
  // public members
  //
  BaseViewModel.prototype.activate = function(routeData) {
    routeData = this.onActivate(routeData);
    this.active(true);
  };
  BaseViewModel.prototype.onActivate = function( /*routeData*/ ) {
    // override me
  };

  BaseViewModel.prototype.deactivate = function() {
    // if (this.active()) {
    this.onDeactivate();
    this.active(false);
    // }
  };
  BaseViewModel.prototype.onDeactivate = function() {
    // override me
  };

  BaseViewModel.prototype.getTemplate = function(vm) {
    return vm.viewTemplate;
  };


  return BaseViewModel;
});
