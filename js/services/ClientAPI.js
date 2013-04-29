/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 4/23/2013
 * Time: 04:37 PM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This file contains the definition and other elements that will allow us to be able to create a CORS
 * request independent of the browser the user is using.
 * <br /><strong>Dependecies:</strong>  The browser the user is using is one that supports CORS.  And also is a latest
 * version.
 *
 /********************************************************************************************************************/
// ** Make sure we are using the right NameSpace.
namespace('SSE.Services');
/**
 * Creates a new CORS request object.
 * @class Represents a CORS Request object.
 */
(function (ClientAPI, $, undefined) {
	/** START Private properties. */
    var _successFx = function() {};
    var _failureFx = function() {};
	var _isDomainRequest = false;
	/**   END Private properties. */

	/** START Public Properties. */
	ClientAPI._namespace = 'SSE.Services.CORSRequest';
	/**   END Public Properties. */

	/** START Private Methods. */
    /**
     * @description This private method initializes the ClientAPI object and makes sure that the host client supports
     * CORS.  Also makes sure that the right Handler is used for the jQuery ajax calls.
     * @private
     */
	function _initializeRequestHandler()
	{
		/** Initialize */
		var xhr = new XMLHttpRequest();

		/** Check if the XMLHttpRequest object has a "withCredentials" property.
		 * "withCredentials" only exits on the XMLHttpRequest2 object. */
 		if ("withCredentials" in xhr) {
			xhr.withCredentials = true; // This is very important for server-side cookies to be sent to the server.
				return xhr;

		/** Check the type of handler available. */
		} else if (typeof XDomainRequest !== "undefined") {
			/** Otherwise, check if XDomainRequest.
			 * XDomainRequest only exists in IE, and is IE's way of making CORS requests. */
			xhr = new XDomainRequest();
			_isDomainRequest = true;

			/** Assigned the jQuery ajax settings. */
			$.ajaxSettings.xhr = function() {
				try {
					if (xhr)
					{
						xhr.onerror = _failureWrapperIE;
						xhr.onload  = _successWrapperIE;
					}
					return xhr;
				}
				catch(e)
				{
					SSE.Lib.MessageBox.Critical(SSE.Model.Message.new({
						title: "Exception thrown configuring XDomainRequest"
						, messageBody: "The following exception was thrown: " + e
					}));

					/** Needs to return something in the event of an error. */
					return null;
				}
			};
		} else {
			/** Otherwise CORS is not supported in this browser. */
			SSE.Lib.MessageBox.Critical(SSE.Models.Message.new({
				title: "Broken Transport"
				, messageBody: 'This client does not support the transport protocol our API uses.\r\nPlease use Chrome or FF browser.'
			}));

			/** Exit the function. */
			return null;
		}

		/** Set default configs. */
		$.support.cors = true;

		/** Return handler. */
		return xhr;
	}

	/**
	 * This is a wrapper for handling the response back from the DomainRequest handler.
	 * @param response {object}
	 * @private
	 */
	function _successWrapperIE(response)
	{
		/** Initialize. */
		var jsonObject = eval("(" + response.currentTarget.responseText + ")");
		return _successFx(jsonObject);
	}

	/**
	 * This is a wrapper for handling the response back from the DomainRequest handler.
	 * @param response {object}
	 * @private
	 */
	function _failureWrapperIE(response)
	{
		return _failureFx(response);
	}
	/**   END Private Methods. */

	/** START Public Method. */
    /**
     * @description This method will make the asynchronous call to the WS API.
     * @param params {object} List of possible options being passed.
     * @returns {object} The request handler
     */
	ClientAPI.ajaxAsync = function (params)
	{
		/** Check if using DomainRequest. */
		if (_isDomainRequest)
		{
			_successFx = params.SuccessFx;
			_failureFx = params.FailureFx;
		}

		/** Initialize the ajax and get the handler. */
		var jxHdr = $.ajax({
			url: SSE.Configuration.ServicesDomain + params.ActionMethod
			, crossDomain: true
			, xhrFields: {
				withCredentials: true
			}
			, async: true
			, cache: false
			, data: JSON.stringify(params.Data)
			, type: 'POST'
			, dataType: 'json'
			, contentType: 'application/json; charset=utf-8'
			, success: params.SuccessFx
			, error: params.FailureFx
		});

		/** Return handler. */
		return jxHdr;
	};
	/**
	 * @description This makes the ajax call synchronously to the WS API.
	 * @param params {object} List of all possible options.
	 * @returns {object} The request handler
	 */
	ClientAPI.ajaxSync = function(params)
	{
		/** Initialize. */
		var response = $.ajax({
			url: SSE.Configuration.ServicesDomain + params.ActionMethod
			, crossDomain: true
			, xhrFields: {
				withCredentials: true
			}
			, async: false
			, cache: false
			, data: JSON.stringify(params.Data)
			, type: 'POST'
			, dataType: 'json'
			, contentType: 'application/json; charset=utf-8'
		});

		/** Check if using DomainRequest. */
		if (_isDomainRequest)
		{
			return eval("(" + response.currentTarget.responseText + ")");
		}

		/** Default result. */
		return eval("(" + response.responseText + ')');
	}
	/**   END Public Method. */

	/** START Class Initialization. */
	_initializeRequestHandler();
	/**   END Class Initialization. */

} ( SSE.Services.ClientAPI = SSE.Services.ClientAPI || {}, jQuery ));

