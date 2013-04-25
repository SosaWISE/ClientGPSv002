/**
 * @fileOverview Created by Andres Sosa
 * Date: 4/24/2013
 * Time: 11:46 AM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description Defines the message model.
 */
namespace('SSE.Models');

/** @namespace SSE.Models */
(function (Message, undefined) {
	/** START Public Methods. */
	Message.new = function(argsObj)
	{
		/** START Private Properties. */
		var title = '[No Title Set]';
		var messageBody = null;
		var messageType = 'Success';
		/**   END Private Properties. */

		/** Initialize. */
		if (argsObj !== undefined && argsObj !== null)
		{
			if (argsObj.title !== undefined && argsObj.title !== null) title = argsObj.title;
			if (argsObj.messageBody != undefined && argsObj.messageBody !== null) messageBody = argsObj.messageBody;
		}

		/** Return result. */
		return {
			/** START Public Properties. */
			/**
			 * @return {string}
			 */
			  get Title() { return title; }
			, set Title(val) { title = val; }
			/**
			 * @return {string}
			 */
			, get MessageBody() { return messageBody; }
			, set MessageBody(val) {messageBody = val; }
			/**
			 * @return {string}
			 */
			, get MessageType() { return messageType; }
			, set MessageType(val) { messageType = val; }
			/**   END Public Properties. */
		};
	};
	/**   END Public Methods. */
})(SSE.Models.Message = SSE.Models.Message || {});
