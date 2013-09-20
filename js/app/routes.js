define([
  'router',
  'app'
], function(
  Router,
  app
) {
  "use strict";

  var router = Router.instance;

  function addRoutes() {
    router.addAnonRoute(app.anonPanelMap.login, 'user', ':action', {
      action: 'login',
    });

    //
    router.addRoute(app.panelMap.home, 'home', '', {});
    router.addRoute(app.panelMap.devices, 'devices', ':tab/:id/:action', {
      tab: 'events',
      id: '',
      action: 'view',
    });
    router.addRoute(app.panelMap.users, 'users', ':id/:action', {
      id: '',
      action: 'view',
    });
    router.addRoute(app.panelMap.billing, 'billing', '', {});
    router.addRoute(app.panelMap.reports, 'reports', '', {});
    router.addRoute(app.panelMap.roboto, 'roboto', '', {});
    router.addRoute(app.panelMap.settings, 'settings', '', {});
  }

  return {
    run: function() {
      addRoutes();
      router.init();
    },
  };
});
