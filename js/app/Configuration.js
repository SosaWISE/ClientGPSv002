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

/**
 * @class Singleton class that contains all the settings for the application.
 */
SSE.Configuration =
	(function () {
		//noinspection JSUnusedAssignment
		/** Initialize object. */
		return {
			get ServicesDomain() { return "//sse.services.cors/"; },
			get ApplicationToken() { return "SSE_MAIN_PORTAL"; }
		};
	}());
