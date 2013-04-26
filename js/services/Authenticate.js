/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 4/26/2013
 * Time: 12:19 PM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This script contains the calls the API that will do authentication for the application.
 *
 /********************************************************************************************************************/
// ** Make sure we are using the right NameSpace.
namespace('SSE.Services');

/**
 * @class Singleton that allows to call authentication API.
 */
(function (Authentication) {

	/** START Public Method. */

	/**
	 * This method initializes the session.  If the user is currently logged in then it will return a customer object.
	 * @param params {object} This object has only two properties that are being used SuccessFx and FailureFx.
	 * @returns {XMLRequestHandler|XDomainRequest}
	 */
	Authentication.SessionStart = function(params)
	{
		/** Initialize. */
		var data = {
			"AppToken": SSE.Configuration.ApplicationToken
		};

		/** Make Async call. */
		return SSE.Services.ClientAPI.ajaxAsync({
			Data: data
			, ActionMethod: 'AuthSrv/SessionStart'
			, SuccessFx: params.SuccessFx
			, FailureFx: params.FailureFx
		});
	};

	Authentication.CustomerAuth = function(params)
	{
		/** Initialize. */
		var data = {
			SessionID: params.SessionID
			, Username: params.Username
			, Password: params.Password
		};

		/** Make the async call. */
		return SSE.Services.ClientAPI.ajaxAsync({
			Data: data
			, ActionMethod: 'AuthSrv/CustomerAuth'
			, SuccessFx: params.SuccessFx
			, FailureFx: params.FailureFx
		});
	}
	/**   END Public Method. */


} (SSE.Services.Authentication = SSE.Services.Authentication || {}));