/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 10:07 AM
 * To change this template use File | Settings | File Templates.
 */
define(['ko', 'messenger', 'model.userAuthInfo', 'datacontext', 'router', /*'dataprimer',*/'amplify'],
function (ko, messenger, userAuthInfo, datacontext, router, /*dataprimer, */amplify) {
	var
		/** START Private Properties. */
		_loginTitle = ko.observable('Secure Login'),
		_userName = ko.observable(''),
		_password = ko.observable(''),
		_rememberMe = ko.observable(false),
		/**   END Private Properties. */

		_loginCmd = ko.asyncCommand({
			execute: function (complete) {

				var userInfoObject = new userAuthInfo(datacontext.Session.model.SessionID());
				userInfoObject.Username(_userName());
				userInfoObject.Password(_password());
				userInfoObject.RememberMe(_rememberMe());

				datacontext.Customer.authenticate(userInfoObject, successfulLogin);

				if (complete) complete();
			},
			canExecute: function (isExecuting) {
				return !isExecuting;// && isDirty() && isValid();
			}
		}),

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) callback();
		},
		/**   END Private Methods. */

		successfulLogin = function (customerResponse) {
//			alert('login\nusername:'+_userName()+'\npassword:'+_password()+'\nremember me:'+_rememberMe());
//			dataprimer.Fetch();

			amplify.publish('customerAuthentication', customerResponse);
			router.TransitionToLastView();
		},

		init = function () {
			/** Initialize view model. */
			_activate();
		};

	/** Init object. */
	init();

	/** Return object. */
	return {
		TmplName: 'login.view',
		get Activate() { return _activate; },
		get LoginTitle() { return _loginTitle; },
		get userName() { return _userName; },
		get password() { return _password; },
		get rememberMe() { return _rememberMe; },
		get loginCmd() { return _loginCmd; }
	};
});
