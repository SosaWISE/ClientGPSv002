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
		, geoFenceId: params.geoFenceId, PlaceName: params.placeName, PlaceDesc: params.placeDesc
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

	GeoObjects.RectangleSave = function (params) {
		/** Initialize. */
		var data = {};
		function successFx(response) {
			if (response.Code === 0)
			{
				SSE.Lib.MessageBox.Success(SSE.Models.Message.new({
					title: "Successfully Saved Rectangle"
					, messageBody: "Successfully saved a rectangular geo fence. "
					, messageType: 'Success'
				}));
				if (params.fxSuccess) params.fxSuccess(response);
			}
			else
			{
				SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
					title: "Error Saving Rectangle"
					, messageBody: "The following message was returned: \r\n" + response.Message
					, messageType: "Error"
				}));
			}
		}
		function failureFx(response) { if (params.fxFailure) params.fxFailure(response); }

		/** Check Arguments. */
		if (params === undefined)
		{
			alert("Please pass params argument.");
			return null;
		}
		if (params.geoFenceId === undefined && params.accountId === undefined)
		{
			SSE.Lib.MessageBox.Warning(SSE.Models.Message.new({
				title: "Invalid Arguments Passed."
				, messageBody: "Confused.  By passing geoFenceId it will do an update.  If geoFenceId is missing then it will do a create.  However it appears that AccountID is missing."
				, messageType: 'WARNING'
			}));
			return null;
		}
		if (params.maxLattitude === undefined
			|| params.maxLongitude == undefined
			|| params.minLattitude == undefined
			|| params.minLongitude == undefined)
		{
			SSE.Lib.MessageBox.Warning(SSE.Models.Message.new({
				title: "Invalid Arguments Passed."
				, messageBody: "One of the coordinates is not defined."
				, messageType: 'WARNING'
			}));
			return null;
		}
		if (params.geoFenceName === undefined
			|| params.geoFenceName === null
			|| params.geoFenceName === '')
		{
			SSE.Lib.MessageBox.Warning(SSE.Models.Message.new({
				title: "Invalid Arguments Passed."
				, messageBody: "Please give this fence a name."
				, messageType: 'WARNING'
			}));
			return null;
		}

		/** Setup the data argument. */
		data.GeoFenceID = params.geoFenceId;
		data.AccountId = params.accountId;
		data.ItemId = params.itemId;
		data.ReportMode = params.reportMode;
		if (params.geoFenceName) data.GeoFenceName = params.geoFenceName;
		if (params.geoFenceDescription) data.GeoFenceDescription = params.geoFenceDescription;
		data.MaxLattitude = params.maxLattitude;
		data.MinLongitude = params.minLongitude;
		data.MaxLongitude = params.maxLongitude;
		data.MinLattitude = params.minLattitude;

		/** Execute. */
		return SSE.Services.ClientAPI.ajaxAsync({
			Data: data
			, ActionMethod: 'GeoSrv/GeoRectangleSave'
			, SuccessFx: successFx
			, FailureFx: failureFx
		});
	};

	GeoObjects.CircleSave = function (params) {
		/** Initialize. */
		var data = {};
		function successFx(response) {
			if (response.Code === 0)
			{
				SSE.Lib.MessageBox.Success(SSE.Models.Message.new({
					title: "Successfully Saved Circle"
					, messageBody: "Successfully saved a rectangular geo fence. "
					, messageType: 'Success'
				}));
				if (params.fxSuccess) params.fxSuccess(response);
			}
			else
			{
				SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
					title: "Error Saving Circle"
					, messageBody: "The following message was returned: \r\n" + response.Message
					, messageType: "Error"
				}));
			}
		}
		function failureFx(response) { if (params.fxFailure) params.fxFailure(response); }

		/** Check Arguments. */
		if (params === undefined)
		{
			SSE.Lib.MessageBox.Warning(SSE.Models.Message.Warning.new({
				title: "Argument Validation"
				, messageBody: "Please pass params argument."
				, messageType: 'Warning'
			}));
			return null;
		}
		/** Setup the data argument. */
		data.GeoFenceID = params.geoFenceID;
		data.CustomerId = params.customerId;
		data.AccountId = params.accountId;
		data.GeoFenceName = params.geoFenceName;
		data.GeoFenceDescription = params.geoFenceDescription;
		data.Radius = params.radius;
		data.CenterLattitude = params.centerLattitude;
		data.CenterLongitude = params.centerLongitude;

		/** Execute query. */
		return SSE.Services.ClientAPI.ajaxAsync({
			Data: data
			, ActionMethod: 'GeoSrv/GeoCircleSave'
			, SuccessFx: successFx
			, FailureFx: failureFx
		});
	};
	/**   END Public Methods. */
} (SSE.Services.GeoObjects = SSE.Services.GeoObjects || {}));