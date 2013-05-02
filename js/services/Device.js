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
		var data = { "UniqueID": params.CMFID };
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
			, ActionMethod: 'Device/GetList'
			, SuccessFx: successFx
			, FailureFX: failureFx
		});
	};

	/**   END Public Method. */

} (SSE.Services.Devices = SSE.Services.Devices || {}));