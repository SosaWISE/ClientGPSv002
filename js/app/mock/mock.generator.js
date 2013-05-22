/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/17/13
 * Time: 6:46 PM
 * To change this template use File | Settings | File Templates.
 */
define('mock/mock.generator',
['jquery', 'moment', 'config'],
function ($, moment, config) {
	var
		init = function () {
			$.mockJSON.random = true;
			$.mockJSON.log = false;
			$.mockJSON.data.GENDER = ['F', 'M'];
			$.mockJSON.DATE_TODAY = [moment().format('MMMM DD YYYY')];
			$.mockJSON.DATE_FULL = [new Date()];
		},

		_sessionTerminate = function () {
	        var data = $.mockJSON.generateFromTemplate({
	        });

			/** Return data object. */
			return data;
		},
		_sessionStart = function () {
			var data = $.mockJSON.generateFromTemplate({
				"Code": 0,
				'Message': "Success",
				'SessionId|100000-200000': 100000,
				'Value': {
					'ApplicationId': config.ApplicationToken,
					'AuthCustomer': null,
					'CreatedOn': '@DATE_FULL',
					'IPAddress': '127.0.0.1',
					'LastAccessedOn': '@DATE_TODAY',
					'SessionId|100000-200000': 100000,
					'SessionTerminated': false,
					'UserId': null
				},
				'ValueType':  "SOS.Services.Interfaces.Models.SosSessionInfo"
			});

			/** Return data object. */
			return data;
		},
		_customerAuth = function () {
		var data = $.mockJSON.generateFromTemplate({
			'Code': 0,
			'Message': 'Success',
			'SessionId|100000-200000': 100000,
		});

		/** Return data object. */
		return data;
	};

	/** Init function. */
	init();
	/** Return object. */
	return {
		model: {
			get SessionStart() { return _sessionStart; },
			get SessionTerminate() { return _sessionTerminate; },
			get CustomerAuth() { return _customerAuth; }
		}
	};
});