/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/14/13
 * Time: 1:47 PM
 * To change this template use File | Settings | File Templates.
 */
define(['../loadDependencies'], function() {
  "use strict";

  require([
    'jquery',
    'infuser',
    'config',
    'routes',
    'router',
    'dataservice',
    'ko',
    'app'
  ], function(
    $,
    infuser,
    config,
    routes,
    Router,
    dataservice,
    ko,
    app
  ) {
    console.log("Bootstrapping version: ", config.version);
    console.log("Application Token: " + config.token);
    console.log("CORS Domain: " + config.serviceDomain);

    $('#busyindicator').activity(true);
    dataservice.Session.SessionStart(config.token, function(data) {
      if (data.Code !== 0) {
        console.error(data);
        return;
      } else {
        // setup infuser/templates then bind
        infuser.defaults.templatePrefix = "_";
        infuser.defaults.templateSuffix = ".tmpl.html";
        infuser.defaults.templateUrl = "/tmpl";
        ko.applyBindings(app, document.getElementById('main'));

        routes.run();
      }
      $('#busyindicator').activity(false);
    });
  });
});
