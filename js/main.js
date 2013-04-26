/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 4/26/2013
 * Time: 12:19 PM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This file has the main entry point to the application.
 *
 /********************************************************************************************************************/
// ** Make sure we are using the right NameSpace.
namespace('SSE');

(function (Main) {
	/** Initializing. */

	/** START Private Properties. */
	var _sessionId = null;
	/**   END Private Properties. */

	/** START Public Properties. */
	Object.defineProperty(Main, 'SessionID', {
		get: function() { return _sessionId; }
	});
	/**   END Public Properties. */

	/** START Public Method. */

	Main.GetSessionIdFx = function ()
	{
		/** Initialize. */
		function fxSuccess(response)
		{
			_sessionId = response.SessionID;
		}
		function fxFailure(response)
		{
			SSE.Lib.MessageBox.Failure(SSE.Models.Message.new({
				Title: 'Failure occurred.'
				, MessageBody: "The following response object was returned: " + response
				, MessageType: "Failure"
			}));
		}

		if (_sessionId === undefined || _sessionId === null)
		{
			SSE.Services.Authentication.SessionStart({'SuccessFx': fxSuccess, 'FailureFx': fxFailure});
		}
	};


	Main.Initialize = function()
	{

	};
	/**   END Public Method. */

}(SSE.Main = SSE.Main || {}));
