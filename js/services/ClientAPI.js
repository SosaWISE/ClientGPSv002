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
(function (CORSRequest, $, undefined) {
	/** START Private properties. */
	/**   END Private properties. */

	/** START Public Properties. */
	CORSRequest._namespace = 'SSE.Services.CORSRequest';
	/**   END Public Properties. */

	/** START Public Method. */
	//noinspection JSValidateJSDoc
	/**
	 * @description This class will allow is to create instances of the CORS Request object.
	 * @param method
	 * @param url
	 * @returns {XMLHttpRequest|XDomainRequest} Depends on the browser
	 */
	CORSRequest.createRequest = function (method, url) {
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

}( SSE.Services.CORSRequest = SSE.Services.CORSRequest || {}, jQuery ));

