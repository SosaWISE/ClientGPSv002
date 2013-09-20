define([], function() {
  return {
    Hashes: {
      // login: '#/login',
      // signUp: '#/signUp',
      // home: '#/home',
      // devices: '#/devices',
      // users: '#/users',
      // billing: '#/billing',
      // reports: '#/reports',
      // settings: '#/settings',

      customers: '#/customers',
    },
    Messages: {
      viewModelActivated: 'viewmodel-activation'
    },
    StateKeys: {
      lastView: 'state.active-hash'
    },
    ViewIds: {
      MainView: '#vm-view',
      HomeView: '#home-view',
      LoginView: '#login-view',
      SignUpView: '#signup-view',
      RegisterView: '#register-view',
      DevicesView: '#devices-view',
      UsersView: '#users-view',
      BillingView: '#billing-view',
      ReportView: '#reports-view',
      SettingsView: '#settings-view'
    },
    Toasts: {
      errorSessionStart: 'Session failed to start.',
      changesPending: 'Please save or cancel your changes before leaving the page.',
      errorSavingData: 'Data could not be saved.  Please check the logs.',
      errorGettingData: 'Could not retrieve data.  Please check the logs.',
      invalidRoute: 'Cannot navigate.  Invalid route.',
      retrievedData: 'Data retrieved successfully',
      savedData: 'Data saved successfully.',
      successfulAuth: 'Successful authentication.',
      failedAuth: 'Failed authentication.'
    },
    IconSprites: {
      GeoMapSprite: "/img/social-login-sprite.png"
    },
    LocalText: {
      AllDevices: '[All Devices]',
      AllEventTypes: '[All Event Types]',
      AllLocations: '[All Locations]'
    },
  };
});
