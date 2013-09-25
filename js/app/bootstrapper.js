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
    'router',
    'dataservice',
    'ko',
    'app'
  ], function(
    $,
    infuser,
    config,
    router,
    dataservice,
    ko,
    app
  ) {
    console.log("Bootstrapping version: ", config.version);
    console.log("Application Token: " + config.token);
    console.log("CORS Domain: " + config.serviceDomain);

    config.user.subscribe(function(user) {
      if (user) {
        // once there is a user, destroy the login forms (for security purposes)
        delete app.anonPanelMap;
        delete app.anonPanels;
        $('#login-container').remove();
        // incase it didn't get moved before the user was set
        $('#loginform').remove();
      }
    });

    $('#busyindicator').activity(true);
    dataservice.Session.SessionStart(config.token, function(data) {
      if (data.Code !== 0) {
        console.error(data);
      } else {
        // setup infuser/templates then bind
        infuser.defaults.templatePrefix = "_";
        infuser.defaults.templateSuffix = ".tmpl.html";
        infuser.defaults.templateUrl = "/tmpl";
        ko.applyBindings(app, document.getElementById('main'));

        // if we are authenticated, this will log us in
        config.user(data.Value.AuthCustomer);

        router.init();
      }
      $('#busyindicator').activity(false);
    });
  });
});
