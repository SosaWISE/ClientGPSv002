/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/22/13
 * Time: 6:28 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'utils',
  'dataservice.base',
  'config'
], function(
  utils,
  DataserviceBase,
  config
) {
  "use strict";

  function DataserviceEvents() {
    DataserviceEvents.super_.call(this, 'AuthSrv', config.serviceDomain);
  }
  utils.inherits(DataserviceEvents, DataserviceBase);

  //
  // helper functions
  //

  DataserviceEvents.prototype.getData = function(data, cb) {
    this.post('UsersRead', data, cb);
  };

  return new DataserviceEvents();
});