/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/22/13
 * Time: 9:57 AM
 * To change this template use File | Settings | File Templates.
 */
define([
  'ukov',
  'ko'
], function(
  ukov,
  ko
) {
  var schemaName = 'model.device';

  //
  // setup schema
  //
  ukov.schema[schemaName] = {
    AccountId: {},
    AccountName: {},
    CustomerID: {},
    CustomerMasterFileId: {},
    Designator: {},
    IndustryAccountId: {},
    IndustryNumber: {},
    InvItemId: {},
    PanelTypeId: {},
    Password: {},
    SubscriberNumber: {},
    SystemTypeId: {},
    UnitID: {},
    Username: {},
    LastLatt: {},
    LastLong: {},
    UIName: {},
  };

  return {
    wrap: function(model, collectionName) {
      model = ukov.wrapModel(model, schemaName, collectionName);
      model.id = model.AccountId();

      model.saving = ko.observable(false);
      model.active = ko.observable(false);
      model.activate = function() {
        this.active(true);
      };
      model.deactivate = function() {
        this.active(false);
      };

      // model.type = ko.observable();
      model.time = ko.observable();

      return model;
    },
  };
});
