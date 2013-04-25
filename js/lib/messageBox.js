/**
 * @fileOverview Created by Andres Sosa
 * Date: 4/24/2013
 * Time: 11:38 AM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This file contains the object that we will use to display messages to the user.
 */
// ** Make sure we are using the right namespace.
namespace('SSE.Lib');

/**
 * This is the MessageBox Singleton class.
 * @class SSE.Lib.MessageBox
 */
/** @namespace SSE.Models */
(function (MessageBox){

	/** START Public Method. */
	/**
	 * This method will display a message box on the browser.
	 * @param message @type {SSE.Models.Message}
	 */
	MessageBox.Success = function (message)
	{
		/** Initialize. */
		alert('SUCCESS:  \r\nTitle: ' + message.Title + '\r\nBody: ' + message.MessageBody + '\r\nType: ' + message.MessageType);
	};
	/**
	 * This method will display a message box on the browser in warning mode.
	 * @param message @type {SSE.Models.Message}
	 */
	MessageBox.Warning = function (message)
	{
		/** Initialize. */
		alert('WARNING:  \r\nTitle: ' + message.Title + '\r\nBody: ' + message.MessageBody + '\r\nType: ' + message.MessageType);
	};
	/**
	 * This method will display a message box on the browser in failure mode.
	 * @param message @type {SSE.Models.Message}
	 */
	MessageBox.Failure = function (message)
	{
		/** Initialize. */
		alert('FAILURE:  \r\nTitle: ' + message.Title + '\r\nBody: ' + message.MessageBody + '\r\nType: ' + message.MessageType);
	};
	/**
	 * This method will display a message box on the browser in critical mode.
	 * @param message @type {SSE.Models.Message}
	 */
	MessageBox.Critical = function (message)
	{
		/** Initialize. */
		alert('CRITICAL:  \r\nTitle: ' + message.Title + '\r\nBody: ' + message.MessageBody + '\r\nType: ' + message.MessageType);
	};
	/**   END Public Method. */

}(SSE.Lib.MessageBox = SSE.Lib.MessageBox || {}));
