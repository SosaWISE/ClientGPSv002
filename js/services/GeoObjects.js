/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 5/6/13
 * Time: 10:12 AM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This script contains methods to manage the geo objects of the system.
 *
 /********************************************************************************************************************/
namespace('SSE.Services');

/**
 * @class Singleton that allows to call Application Service API.
 */
(function(GeoObjects) {
	/** START Private Properties. */
	/**   END Private Properties. */

	/** START Public Properties. */
	/**   END Public Properties. */

	/** START Public Methods. */
	GeoObjects.PointSave = function (params) {
		/** Initialize. */
		var data = { SessionID: params.sessionId, AccountID: params.accountId, CustomerID: params.customerId
		, GeoFenceID: params.geoFenceId, PlaceName: params.placeName, PlaceDesc: params.placeDesc
		, Lattitude: params.lattitude, Longitude: params.longitude};
		function successFx(response) {
			if (response.Code === 0)
			{
				SSE.Lib.MessageBox.Success(SSE.Models.Message.new({
					title: "Successfull Point Save"
					, messageBody: "You have successfully saved the point."
					, messageType: 'Success'
				}));
				if (params.SuccessFx) params.SuccessFx(resposne);
			}
			else
			{
				SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
					title: 'Error Saving Point'
					, messageBody: "The following message was returned: " + response.Message
					, messageType: 'Error'
				}));
			}
		}
		function failureFx(response) {
			if (params.FailureFx) params.FailureFx(response);
		}

		/** Execute. */
		return SSE.Services.ClientAPI.ajaxAsync({
			Data: data
			, ActionMethod: 'GeoSrv/PointCreateUpdate'
			, Success: successFx
			, Failure: failureFx
		});
	};

	GeoObjects.PointDelete = function (params) {
		/** Initialize. */
		var data = { SessionID: params.sessionId, AccountID: params.accountId, CustomerID: params.customerId
			, GeoFenceID: params.geoFenceId };
		function successFx(response) {
			if (response.Code === 0)
			{
				SSE.Lib.MessageBox.Success(SSE.Models.Message.new({
					title: "Successfull Point Deleted"
					, messageBody: "You have successfully deleted the point."
					, messageType: 'Success'
				}));
				if (params.SuccessFx) params.SuccessFx(resposne);
			}
			else
			{
				SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
					title: 'Error deleting Point'
					, messageBody: "The following message was returned: " + response.Message
					, messageType: 'Error'
				}));
			}
		}
		function failureFx(response) {
			if (params.FailureFx) params.FailureFx(response);
		}

		/** Execute. */
		return SSE.Services.ClientAPI.ajaxAsync({
			Data: data
			, ActionMethod: 'GeoSrv/PointDelete'
			, Success: successFx
			, Failure: failureFx
		});
	};

	GeoObjects.PointRead = function (params) {
		/** Initialize. */
		var data = { SessionID: params.sessionId, AccountID: params.accountId, GeoFenceID: params.geoFenceId };
		function successFx(response) {
			if (response.Code === 0)
			{
				SSE.Lib.MessageBox.Success(SSE.Models.Message.new({
					title: "Successfull Point Read"
					, messageBody: "You have successfully Read the point."
					, messageType: 'Success'
				}));
				if (params.SuccessFx) params.SuccessFx(resposne);
			}
			else
			{
				SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
					title: 'Error Reading Point'
					, messageBody: "The following message was returned: " + response.Message
					, messageType: 'Error'
				}));
			}
		}
		function failureFx(response) {
			if (params.FailureFx) params.FailureFx(response);
		}

		/** Execute. */
		return SSE.Services.ClientAPI.ajaxAsync({
			Data: data
			, ActionMethod: 'GeoSrv/PointRead'
			, Success: successFx
			, Failure: failureFx
		});
	};
	/**   END Public Methods. */
} (SSE.Services.GeoObjects = SSE.Services.GeoObjects || {}));