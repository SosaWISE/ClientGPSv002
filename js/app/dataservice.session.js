/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 6:08 PM
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

  function DataserviceSession() {
    DataserviceSession.super_.call(this, 'AuthSrv', config.serviceDomain);
  }
  utils.inherits(DataserviceSession, DataserviceBase);

  //
  // helper functions
  //
  DataserviceSession.prototype.SessionStart = function(appToken, cb) {
    this.post('SessionStart', {
      AppToken: appToken,
    }, cb);
  };
  DataserviceSession.prototype.SessionTerminate = function(cb) {
    this.post('SessionTerminate', null, cb);
  };

  return new DataserviceSession();
});
