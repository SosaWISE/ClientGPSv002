/**
 * Default values for window.webconfig
 * To override the defaults, set the values in webconfig.js
 */
// define config module
define([
  'webconfig',
  'ko',
  'toastr',
  'mock/mock'
], function(
  config,
  ko,
  toastr,
  mock
) {
  // sets values that haven't already been set.
  function set(key, value) {
    if (!config.hasOwnProperty(key)) {
      config[key] = value;
    }
  }

  //
  // Explicit Properties (non-overrideable)
  //
  config.version = '0.0.1';
  config.CurrentUser = ko.observable();
  config.Logger = toastr;

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
  //
  //@TODO: remove the following properties
  //
  set('localizationId', 'en-US');
  set('toasterTimeout', 2000);
  toastr.options.timeOut = config.toasterTimeout;

  if (config.useMocks) {
    mock.init(config);
  }
  return config;
});
