/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 5/14/2013
 * Time: 4:182 aM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This file contains the configuration settings for this SPA.
 *
 /********************************************************************************************************************/
define('config',
	['toastr', 'ko'],
	function (toastr, ko) {
		/** Initialize Constructor. */
		var
			_servicesDomain     = "//sse.services.cors/",
			_applicationToken   = "SSE_MAIN_PORTAL",
			_applicationVersion = "1.0.0",
			_logger             = toastr,
			_currentUser        = ko.observable(),
			_hashes             = {
				devices:    '#/devices',
				users:      '#/users',
				billing:    '#/billing',
				reports:    '#/reports',
				customers:  '#/customers'
			},

			_toasts = {
				changesPending: 'Please save or cancel your changes before leaving the page.',
				errorSavingData: 'Data could not be saved.  Please check the logs.',
				errorGettingData: 'Could not retrieve data.  Please check the logs.',
				invalidRoute: 'Cannot navigate.  Invalid route.',
				retrievedData: 'Data retrieved successfully',
				savedData: 'Data saved successfully.',
				successfulAuth: 'Successful authentication.',
				failedAuth: 'Failed authentication.'
			},

			_initFx = function () {

			};

		/** Initialize. */
		_initFx();

		/** Return object. */
		return {
			get ServicesDomain() { return _servicesDomain; },
			get ApplicationToken() { return _applicationToken; },
			get ApplicationVersion() { return _applicationVersion; },
			get Logger() { return _logger; },
			get CurrentUser() { return _currentUser; },
			get Hashes() { return _hashes; },
			get Toasts() { return _toasts; }
		};
	});