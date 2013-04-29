/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 4/26/2013
 * Time: 4:58 PM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This is the ViewModel for the login form.
 *
 /********************************************************************************************************************/
// ** Make sure we are using the right NameSpace.
namespace('SSE.ViewModels');

/**
 * @class Singleton object that will allow for user Authentication.  This is tied to the View.
 */
(function(Login) {
	/** Initialize. */
	var vm = {};

	/** START Public Methods. */
	Login.Initialize = function ()
	{
		vm = {
			LoginTitle: ko.observable("Login"),
			PersonAge: ko.observable(43),
			userName: ko.observable("SosaWISE"),
			userPassword: ko.observable("GetThis")
		};

		vm.LoginTitle.subscribe(function(newValue){
			alert("The Login Title has changed to : " + newValue);
		});

		ko.applyBindings(vm);
	};

	Login.AuthenticateUser = function (getSessionIDFx)
	{
		/** Valida Arguments. */
		if (getSessionIDFx === undefined || getSessionIDFx === null || typeof getSessionIDFx !== 'function')
		{
			SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
				Title: "Argument failure"
				, MessageBody: "Failed to retrieve the SessionID"
				, MessageType: "Error"
			}));

			// ** Exit method.
			return null;
		}

		/** Initialize values. */
		var sessionID = getSessionIDFx();
		function successFx(response){
			console.log(response);
		}
		function failureFx(response){

		}

		/** Execute Authentication. */
		return SSE.Services.Authentication.CustomerAuth({
			SessionID: sessionID
			, Username: vm.userName()
			, Password: vm.userPassword()
			, SuccessFx: successFx
			, FailureFx: failureFx
		});
	};
	/**   END Public Methods. */
} (SSE.ViewModels.Login = SSE.ViewModels.Login || {}));
