/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 5/1/13
 * Time: 11:22 AM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This script contains the object that will contain the information about the application.
 *
 /********************************************************************************************************************/
// ** Make sure we are using the right NameSpace.
namespace('SSE.Services');

/**
 * @class Singleton that allows to call Application Service API.
 */
(function (Devices) {

	/** START Private Properties. */
	var _devicesList = [];
	/**   END Private Properties. */

	/** START Public Properties. */
	Object.defineProperty(Devices, 'DevicesList', {
		get: function() { return _devicesList; }
	});
	/**   END Public Properties. */

	/** START Public Method. */
	Devices.GetList = function (params)
	{
		/** Initialize.  */
        var data = { UniqueID: params.UniqueID };
		function successFx(response)
		{
			if (response.Code === 0)
			{
				SSE.Lib.MessageBox.Success(SSE.Models.Message.new({
					title: 'Successfull Device Retrieval'
					, messageBody: "You have successfully retrieved the list of devices for this account."
					, messageType: 'Success'
				}));
			}
			else
			{
				SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
					title: 'Error Device Retrieval'
					, messageBody: "The following message was returned: " + response.Message
					, messageType: 'Error'
				}));
			}
			if (params.SuccessFx) params.SuccessFx(resposne);
		}
		function failureFx(response)
		{
			if (params.FailureFx) params.FailureFx(response);
		}

		/** Execute. */
		return SSE.Services.ClientAPI.ajaxAsync({
			Data: data
			, ActionMethod: 'Device/AcquireList'
			, SuccessFx: successFx
			, FailureFX: failureFx
		});
	};

    Devices.GetListByCustomerID = function (params) {
        /** Initialize. */
        var data = { UniqueID: params.UniqueID };
        function successFx(response)
        {
            if (response.Code === 0)
            {
                SSE.Lib.MessageBox.Success(SSE.Models.Message.new({
                    title: 'Successfull Device Retrieval'
                    , messageBody: "You have successfully retrieved the list of devices for this account."
                    , messageType: 'Success'
                }));
            }
            else
            {
                SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
                    title: 'Error Device Retrieval'
                    , messageBody: "The following message was returned: " + response.Message
                    , messageType: 'Error'
                }));
            }
            if (params.SuccessFx) params.SuccessFx(resposne);
        }
        function failureFx(response)
        {
            if (params.FailureFx) params.FailureFx(response);
        }

        /** Execute. */
        return SSE.Services.ClientAPI.ajaxAsync({
            Data: data
            , ActionMethod: 'Device/AcquireListByCustomerID'
            , SuccessFx: successFx
            , FailureFX: failureFx
        });
    };

    /**
     * @Description This method will allow for acquiring device details
     * @param params {object} consisting of the following:
     * SessionID {long}
     * AccountID {long}
     * CustomerID {long}
     * @returns {Object} Request header
     */
    Devices.GetDeviceDetails = function (params) {
        /** Initialize. */
        var data = {AccountID: params.accountId, CustomerID: params.customerId, SessionID: params.sessionId};
        function successFx(response) {
            if (response.Code == 0)
            {
                SSE.Lib.MessageBox.Success(SSE.Models.Message.new({
                    title: "Successful Device Detail"
                    , messageBody: "Successfully retrieved device detail."
                    , messageType: "Success"
                }));
            }
            else
            {
                SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
                    title:  'Error Device Details;'
                    , messageBody: "The following messate was returned: " + response.Message
                    , messageType: "Error"
                }));
            }
            if (params.SuccessFx) { params.SuccessFx(response);}
        }
        function failureFx(response) {
            if (params.failureFx) params.failureFx(response);
        }

        /** Executing statement. */
        return SSE.Services.ClientAPI.ajaxAsync({
            Data: data
            , ActionMethod: 'Device/AcquireDeviceDetails'
            , SuccessFx: successFx
            , FailureFx: failureFx
        });
    };

    Devices.GetDeviceGeoFences = function(params) {
        /** Initialize. */
        var data = {AccountID: params.accountId, CustomerID: params.customerId, SessionID: params.sessionId};
        function successFx(response) {
            if (response.Code == 0)
            {
                SSE.Lib.MessageBox.Success(SSE.Models.Message.new({
                    title: "Successful Device Details"
                    , messageBody: "Successfully retrieved device detail."
                    , messageType: "Success"
                }));
            }
            else
            {
                SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
                    title:  'Error Device Details;'
                    , messageBody: "The following message was returned: " + response.Message
                    , messageType: "Error"
                }));
            }
            if (params.SuccessFx) { params.SuccessFx(response);}
        }
        function failureFx(response) {
            if (params.failureFx) params.failureFx(response);
        }

        /** Executing statement. */
        return SSE.Services.ClientAPI.ajaxAsync({
            Data: data
            , ActionMethod: 'Device/AcquireDeviceGeoFences'
            , SuccessFx: successFx
            , FailureFx: failureFx
        });
    };

    Devices.GetDeviceEvents = function(params) {
        /** Initialize. */
        var data = {AccountID: params.accountId, CustomerID: params.customerId, SessionID: params.sessionId};
        data.StartDate = params.startDate;
        data.EndDate = params.endDate;
	    data.PageSize = params.pageSize || 5;
	    data.PageNumber = params.pageNumber || 1;

	    function successFx(response) {
		    if (response.Code == 0)
		    {
			    SSE.Lib.MessageBox.Success(SSE.Models.Message.new({
				    title: "Successful Device Events"
				    , messageBody: "Successfully retrieved device detail."
				    , messageType: "Success"
			    }));
		    }
		    else
		    {
			    SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
				    title:  'Error Device Events;'
				    , messageBody: "The following message was returned: " + response.Message
				    , messageType: "Error"
			    }));
		    }
		    if (params.SuccessFx) { params.SuccessFx(response);}
	    }
	    function failureFx(response) {
		    if (params.failureFx) params.failureFx(response);
	    }

	    /** Executing statement. */
        return SSE.Services.ClientAPI.ajaxAsync({
            Data: data
            , ActionMethod: 'Device/AcquireDeviceEvents'
            , SuccessFx: successFx
            , FailureFx: failureFx
        });
    };

	/**   END Public Method. */

} (SSE.Services.Devices = SSE.Services.Devices || {}));