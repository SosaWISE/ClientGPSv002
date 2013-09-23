/**
 * Default values for window.webconfig
 * To override the defaults, set the values in webconfig.js
 */
// define config module
define([
  'webconfig',
  'ko',
  'toastr'
], function(
  config,
  ko,
  toastr
) {
  "use strict";

  function set(key, value) {
    // only sets values that haven't already been set.
    if (!config.hasOwnProperty(key)) {
      config[key] = value;
    }
  }

  //
  // Explicit Properties (non-overrideable)
  //
  config.version = '0.0.1';
  config.user = ko.observable();
  config.logger = toastr;

  //
  // Property Defaults (overrideable)
  //
  set('useMocks', false);
  set('token', 'SSE_MAIN_PORTAL');
  set('serviceDomain', 'sse.services.cors');
  set('titlePrefix', '');
  set('titlePostfix', '| Security Sciences');
  set('dealerId', 5000);
  set('salesRepId', 'PORT001');
  set('leadSourceId', '14'); // Portal
  set('leadDispositionId', '8'); //Sign up on Portal
  set('localizationId', 'en-US');
  //@TODO: remove the following properties
  set('toasterTimeout', 2000);
  toastr.options.timeOut = config.toasterTimeout;

  return config;
});
