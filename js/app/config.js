/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 5/14/2013
 * Time: 4:182 aM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This file contains the configuration settings for this SPA.
 *
 /********************************************************************************************************************/
define('config',
	['toastr', 'mock/mock', 'infuser', 'ko'],
	function (toastr, mock, infuser, ko) {
		/** Initialize Constructor. */
		var
			_servicesDomain     = "//sse.services.cors/",
			_applicationToken   = "SSE_MAIN_PORTAL",
			_applicationVersion = "1.0.0",
			_logger             = toastr,
			_messages           = {
				viewModelActivated: 'viewmodel-activation'
			},
			_stateKeys          = {
				lastView: 'state.active-hash'
			},
			_currentUser        = ko.observable(),
			_hashes             = {
				devices:    '#/devices',
				users:      '#/users',
				billing:    '#/billing',
				reports:    '#/reports',
				customers:  '#/customers'
			},

			_storeExpirationMs = (1000 * 60 * 60 * 24), // 1 day in milliseconds.

			_throttle = 400,
			_title = 'SSE Console > ',
			_toasterTimeout = 2000,

			_useMocks = false,
			useMocks = function (val) {
				if (val) {
					_useMocks = val;
					_initFx();
				}
				return _useMocks;
			},

			_viewIds = {
				LoginView: '#login-view',
				RegisterView: '#register-view'
			},

			_toasts = {
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

			/**
			 * Methods
			 */
			_dataServiceInit = function () {},

			validationInit = function () {
				ko.validation.configure({
					registerExtenders: true,    // default is true.
					messagesOnModified: true,   // default is true.
					insertMessages: true,       // default is true.
					parseInputAttributes: true, // default is false.
					writeInputAttributes: true, // default is false.
					messageTemplate: null,      // default is null.
					decorateElement: true       // default is false.  Applies the .validationElement CSS class.
				});
			},

			configureExternalTemplates = function () {
				infuser.defaults.templatePrefix = "_";
				infuser.defaults.templateSuffix = ".tmpl.html";
				infuser.defaults.templateUrl = "/Tmpl";
			},

			_initFx = function () {
				if (_useMocks) {
					_dataServiceInit = mock.DataServiceInit;
				}
				_dataServiceInit();

				toastr.options.timeOut = _toasterTimeout;
				configureExternalTemplates();
				validationInit();
			};

		/** Initialize. */
		_initFx();

		/** Return object. */
		return {
			get ServicesDomain() { return _servicesDomain; },
			get ApplicationToken() { return _applicationToken; },
			get ApplicationVersion() { return _applicationVersion; },
			get Logger() { return _logger; },
			get Messages() { return _messages; },
			get StateKeys() { return _stateKeys; },
			get CurrentUser() { return _currentUser; },
			get Hashes() { return _hashes; },
			get Toasts() { return _toasts; },
			get StoreExpirationMs() { return _storeExpirationMs; },
			get Window() { return window; },
			get Throttle() { return _throttle; },
			get Title() { return _title; },
			get DataServiceInit() { return _dataServiceInit; },
			get UseMocks() { return useMocks; },
			get ViewIds() { return _viewIds; }
		};
	});