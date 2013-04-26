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

        /** Check the type of handler available. */
        if (typeof XDomainRequest !== "undefined") {
			/** Otherwise, check if XDomainRequest.
			 * XDomainRequest only exists in IE, and is IE's way of making CORS requests. */
			xhr = new XDomainRequest();
			if (xhr)
			{
				xhr.onerror = _failureWrapperIE;
				xhr.onload  = _successWrapperIE;
				_isDomainRequest = true;
			}
		} else {
			/** Otherwise CORS is not supported in this browser. */
			SSE.Lib.MessageBox.Critical(SSE.Models.Message.new({
				title: "Broken Transport"
				, messageBody: 'This client does not support the transport protocol our API uses.\r\nPlease use Chrome or FF browser.'
			}));

			/** Exit the function. */
			return;
		}

		/** Assigned the jQuery ajax settings. */
		$.ajaxSettings.xhr = xhr;
		$.support.cors = true;
	}

	/**
	 * This is a wrapper for handling the response back from the DomainRequest handler.
	 * @param response {object}
	 * @private
	 */
	function _successWrapperIE(response)
	{

	}

	/**
	 * This is a wrapper for handling the response back from the DomainRequest handler.
	 * @param response {object}
	 * @private
	 */
	function _failureWrapperIE(response)
	{}
	/**   END Private Methods. */

	/** START Public Method. */
    /**
     * @description This method will make the asynchronous call to the WS API.
     * @param params List of possible options being passed.
     */
	ClientAPI.ajaxAsync = function (params)
	{
		/** Initialize the ajax and get the handler. */
		var jxHdr = $.ajax({
			url: SSE.Configuration.ServicesDomain + params.ActionMethod
			, crossDomain: true
			, async: true
			, cache: false
			, data: JSON.stringify(params.Data)
			, type: 'POST'
			, dataType: 'json'
			, contentType: 'application/json; charset=utf-8'
			, success: params.SuccessFx
			, error: params.FailureFx
		});

		/** Check if using DomainRequest. */
		if (_isDomainRequest)
		{
			_successFx = params.SuccessFx;
			_failureFx = params.FailureFx;
		}

		/** Return handler. */
		return jxHdr;
	};

	/**
	 * @description This class will allow is to create instances of the CORS Request object.
	 * @param method
	 * @param url
	 * @returns {XMLHttpRequest|XDomainRequest} Depends on the browser
	 */
	ClientAPI.createRequest = function (method, url) {
		/** Initialize */
		var xhr = new XMLHttpRequest();

		/** Check if the XMLHttpRequest object has a "withCredentials" property.
		 * "withCredentials" only exits on the XMLHttpRequest2 object. */
		if ("withCredentials" in xhr) {
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest !== "undefined") {
			/** Otherwise, check if XDomainRequest.
			 * XDomainRequest only exists in IE, and is IE's way of making CORS requests. */
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			/** Otherwise CORS is not supported in this browser. */
			xhr = null;
		}

		/** Return result. */
		return xhr;
	};
	/**   END Public Method. */

	/** START Class Initialization. */
	_initializeRequestHandler();
	/**   END Class Initialization. */

}( SSE.Services.ClientAPI = SSE.Services.ClientAPI || {}, jQuery ));

