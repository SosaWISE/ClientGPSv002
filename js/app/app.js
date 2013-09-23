define([
  'router',
  'resources',
  'vm.panel.login',
  'vm.panel.home',
  'vm.panel.devices',
  'vm.panel.users',
  'vm.panel.billing',
  'vm.panel.reports',
  'vm.panel.settings'
], function(
  router,
  resources,
  LoginViewModel,
  HomePanelViewModel,
  DevicesPanelViewModel,
  UsersPanelViewModel,
  BillingPanelViewModel,
  ReportsPanelViewModel,
  SettingsPanelViewModel
) {
  "use strict";
  router = router.instance;

  function createMap(panels) {
    var map = {};
    panels.forEach(function(panel) {
      map[panel.id] = panel;
    });
    return map;
  }

  function setTemplate(panels, name, postfix) {
    panels.forEach(function(panel) {
      panel[name] = panel.id + postfix;
    });
  }

  var app = {};

  app.anonPanelMap = createMap(app.anonPanels = [
    new LoginViewModel({
      id: 'login',
      name: 'Secure Login',
      ico: null,
    })
  ]);
  setTemplate(app.anonPanels, 'viewTemplate', '.view');

  app.panelMap = createMap(app.panels = [
    new HomePanelViewModel({
      id: 'home',
      name: 'Home',
      ico: '&#8962;',
    }),
    new DevicesPanelViewModel({
      id: 'devices',
      name: 'Devices',
      ico: '&#59176;',
    }),
    new UsersPanelViewModel({
      id: 'users',
      name: 'Users',
      ico: '&#128101;',
    }),
    new BillingPanelViewModel({
      id: 'billing',
      name: 'Billing',
      ico: '&#59197;',
    }),
    new ReportsPanelViewModel({
      id: 'reports',
      name: 'Reports',
      ico: '&#128202;',
    }),
    new SettingsPanelViewModel({
      id: 'settings',
      name: 'Settings',
      ico: '&#9881;',
    })
  ]);
  setTemplate(app.panels, 'viewTemplate', '.view');
  setTemplate(app.panels, 'moduleTemplate', '.module.view');


  //
  // add routes
  //
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
  router.addRoute(app.panelMap.settings, 'settings', '', {});

  return app;
});
