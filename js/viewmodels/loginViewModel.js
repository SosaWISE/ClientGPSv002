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
(function(Login, $) {
	/** Initialize. */
	var vm = {};

	/** START Public Methods. */
	Login.Initialize = function ()
	{
		vm = {
			LoginTitle: ko.observable("Secure Login"),
			PersonAge: ko.observable(43),
			userName: ko.observable(""),
			userPassword: ko.observable(""),
			rememberMe: ko.observable(false)
		};

		vm.LoginTitle.subscribe(function(newValue){
			alert("The Login Title has changed to : " + newValue);
		});

		ko.applyBindings(vm);
	};

	/**
	 * @description This is a public method for the Login ViewModel class.  Given a function as an argument it will
	 * authenticate the user with the credentials bound to the knockout ViewModel.
	 * @param getSessionIDFx {function}
	 * @param aSuccessFx {function} Closure for the success of the method.
	 * @param aFailureFx {function} Closure for the failure of the ajax call.
	 * @returns {object}
	 */
	Login.AuthenticateUser = function (getSessionIDFx, aSuccessFx, aFailureFx)
	{
		/** Valida Arguments. */
		if (getSessionIDFx === undefined || getSessionIDFx === null || typeof getSessionIDFx !== 'function')
		{
			SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
				title: "Argument failure"
				, messageBody: "Failed to retrieve the SessionID"
				, messageType: "Error"
			}));

			// ** Exit method.
			return null;
		}

		/** Initialize values. */
		var sessionID = getSessionIDFx();
		function successFx(response){
			console.log(response);

			/** Check that the call was successfull. */
			if (response.Code !== 0)
			{
				SSE.Lib.MessageBox.Error(SSE.Models.Message.new({
					title: "Authentication Failed"
					, messageBody: response.Message
					, messageType: 'Error'
				}));
				return; //Exit
			}

			/** Fire trigger. */
			$.event.trigger({
				type: 'custAuthentication'
				, authenticatedCustomer: response.Value
				, time: new Date()
			});

			/** Check to see if there is a clousure. */
			if (aSuccessFx) aSuccessFx(response);
		}
		function failureFx(response){
			SSE.Lib.MessageBox.Failure(SSE.Models.Message.new({
				Title: 'Failure on User Authentication'
				, MessageBody: "Connection failed object: " + response
				, MessageType: "Failure"
			}));
			if (aFailureFx) aFailureFx(response);
		}

		/** Execute Authentication. */
		return SSE.Services.Authentication.CustomerAuth({
			SessionID: sessionID
			, Username: vm.userName()
			, Password: vm.userPassword()
			, RememberMe: vm.rememberMe()
			, SuccessFx: successFx
			, FailureFx: failureFx
		});
	};
	/**   END Public Methods. */
} (SSE.ViewModels.Login = SSE.ViewModels.Login || {}, jQuery));