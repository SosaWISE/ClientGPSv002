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
    router.defaultAnonPath = '/user/login';
    router.addAnonRoute('user', ':action', {
      action: 'login',
    }, app.loginVM);

    //
    router.defaultPath = '/home';
    router.defaultPath = '/devices';
    router.addRoute('devices', ':tab/:id/:action', {
      tab: 'events',
      id: '',
      action: 'view',
    }, app.devicesPanel);
  }

  return {
    run: function() {
      router.clear();
      addRoutes();
      router.init();
    },
  };
});
