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

(function (Main, $) {
	/** Initializing. */

	/** START Private Properties. */
	/**
	 * @property {long} _sessionId This is the currently active session.  This is stored in a cockie.
	 * @private
	 */
	var _sessionId = null;
	/**
	 * @property {object} _authCustomer This is the Authenticated Customer.
	 * @private
	 */
	var _authCustomer = null;

	/**
	 *
	 * @type {{lines: number, length: number, width: number, radius: number, corners: number, rotate: number, direction: number, color: string, speed: number, trail: number, shadow: boolean, hwaccel: boolean, className: string, zIndex: number, top: string, left: string}}
	 * @private
	 */
	var _spinnerOpts = {
		lines: 9, // The number of lines to draw
		length: 0, // The length of each line
		width: 8, // The line thickness
		radius: 14, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#000', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};
	/**   END Private Properties. */

	/** START Private event handlers. */
	function _onSessionStart(e)
	{
		_sessionId = e.SessionID;
	}
	function _onCustAuthentication(e)
	{
		_authCustomer = e.authenticatedCustomer;
	}
	function _onSessionTermination()
	{
		_authCustomer = null;
		_sessionId = null;
	}
	/**   END Private event handlers. */


	/** START Public Properties. */
	Object.defineProperty(Main, 'SessionID', {
		get: function() { return _sessionId; }
		, set: function(val) { _sessionId = val; }
	});
	Object.defineProperty(Main, 'AuthCustomer', {
		get: function() { return _authCustomer; }
	});
	Object.defineProperty(Main, 'SpinnerOpts', {
		get: function () {return _spinnerOpts; }
	});
	/**   END Public Properties. */

	/** START Public Method. */

	/**
	 * @description This method retrieves the SessionID Asynchronously.
	 */
	Main.GetSessionIdFx = function ()
	{
		/** Initialize. */
		function fxSuccess(response)
		{
			_sessionId = response.SessionId;
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

	/**
	 * This method returns the session id for a new session.  It does this by making an syncronous call.
	 * @returns {long}
	 */
	Main.GetSessionIdFxSync = function (){
		/** Check to see if the SessionID is already present. */
		if (_sessionId === undefined || _sessionId === null)
		{
			/** Execute call. */
			var responseObj = SSE.Services.Authentication.SessionStartSync();
			_sessionId = responseObj.SessionID;
		}

		/** Return sessionId. */
		return _sessionId;
	};


	/**
	 * @description This is the main entry point for the application.
	 */
	Main.Initialize = function()
	{
		/** Initialize any special handlers of internal events. */
		$(document).on('custAuthentication', _onCustAuthentication);
		$(document).on('sessionTermination', _onSessionTermination);
		$(document).on('sessionStart', _onSessionStart);

		/** Start the new session. */
		SSE.Services.Authentication.SessionStart({
			SuccessFx: function (response)
			{
				_sessionId = response.SessionId;

				/** Check to see if there was a successfull authentication. */
				if (response.Value.AuthCustomer !== null)
				{
					/** Fire trigger. */
					$.event.trigger({
						type: 'custAuthentication'
						, authenticatedCustomer: response.Value.AuthCustomer
						, time: new Date()
					});
				}
			}
			, FailureFx: function (response){
				SSE.Lib.MessageBox.Failure(SSE.Models.Message.new({
					Title: "Failure on Main Init"
					, MessageBody: "When calling SessionStart a failure occurred: " * response
					, MessageType: "Failure"
				}));
			}
		});
	};
	/**   END Public Method. */

}(SSE.Main = SSE.Main || {}, jQuery));