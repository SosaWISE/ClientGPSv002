/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 6:07 PM
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

  function DataserviceCustomer() {
    DataserviceCustomer.super_.call(this, 'AuthSrv', config.serviceDomain);
  }
  utils.inherits(DataserviceCustomer, DataserviceBase);

  //
  // helper functions
  //
  DataserviceCustomer.prototype.CustomerAuth = function(data, cb) {
    this.post('CustomerAuth', data, cb);
  };
  DataserviceCustomer.prototype.CustomerUpdate = function(data, cb) {
    this.post('CustomerUpdate', data, cb);
  };
  DataserviceCustomer.prototype.CustomerSignUp = function(data, cb) {
    this.post('CustomerSignUp', data, cb);
  };

  return new DataserviceCustomer();
});
