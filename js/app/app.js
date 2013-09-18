define([
  'vm.login',
  // 'vm.signUp',
  // 'vm.register',
  'vm.panel.devices' //,
  // 'vm.users',
  // 'vm.home',
  // 'vm.billing',
  // 'vm.reports',
  // 'vm.settings'
], function(
  LoginViewModel,
  // vm_signUp,
  // vm_register,
  DevicesPanelViewModel //,
  // vm_users,
  // vm_home,
  // vm_billing,
  // vm_reports,
  // vm_settings
) {
  var panels,
    anonPanels,
    devicesPanel = new DevicesPanelViewModel({

    }),
    loginPanel = new LoginViewModel();

  panels = [
    // vm_home,
    devicesPanel //,
    // vm_users,
    // vm_billing,
    // vm_reports,
    // vm_settings
  ];
  anonPanels = [
    loginPanel
  ];

  return {
    panels: panels,
    // Home: vm_home,
    devicesPanel: devicesPanel,
    // Users: vm_users,
    // Billing: vm_billing,
    // Reports: vm_reports,
    // Settings: vm_settings,

    anonPanels: anonPanels,
    loginVM: loginPanel,
    // SignUp: vm_signUp,
    // Register: vm_register,
  };
});
