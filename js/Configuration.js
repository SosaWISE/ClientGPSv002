/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 4/26/2013
 * Time: 10:42 aM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This file contains the configuration settings for this SPA.
 *
 /********************************************************************************************************************/
// ** Make sure we are using the right NameSpace.
namespace('SSE');

(function (Configuration) {
	//noinspection JSUnusedAssignment
	/** Initialize object. */
	Configuration = {
		get ServicesDomain() { return "//sse.services.cors/"; }
	};
}(SSE.Configuration = SSE.Configuration || {}));
