define([
  'ko'
], function(
  ko
) {
  "use strict";

  function ListViewModel() {
    this.list = ko.observableArray();
    this.savingMap = {};

    // function to:
    //  - load list
    //  - sort list of wrapped models
    //  - wrap a model
    //  - save a model
    //  - handle after save
    //  -
  }

  ListViewModel.prototype.isNew = function(item) {
    return !this.isSaving(item) || this.savingMap[item].isNew;
  };
  ListViewModel.prototype.isSaving = function(item) {
    return !!this.savingMap[item];
  };
  ListViewModel.prototype.loadAll = function(cb) {
    this.onLoadAll(cb);
  };
  ListViewModel.prototype.save = function(item, cb) {
    if (!item) {
      cb('missing item');
    }
    if (this.isSaving(item)) {
      cb('item is already saving');
    }

    if (this.list().indexOf(item) < 0) {
      cb('item not in list');
      return;
    }

    this.onSave(item, cb);
  };

  // ListViewModel.prototype.onLoadAll = function(cb) {
  //   cb('onLoadAll must be overridden');
  // };
  // ListViewModel.prototype.onSave = function(item, cb) {
  //   cb('onSave must be overridden');
  // };
  //
  // ListViewModel.create = function() {
  //   return new ListViewModel();
  // };
  return ListViewModel;
});
