/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 10:07 AM
 * To change this template use File | Settings | File Templates.
 */
define(['ko', 'messenger', 'model.userAuthInfo', 'datacontext', 'router', 'amplify', 'vm.signUp'],
function (ko, messenger, userAuthInfo, datacontext, router, amplify, signupVM) {
	var
		/** START Private Properties. */
		_title = ko.observable('Secure Login'),
		_userName = ko.observable(''),
		_password = ko.observable(''),
		_rememberMe = ko.observable(false),
		_editing = ko.observable(false),
		/**   END Private Properties. */

		_loginCmd = ko.asyncCommand({
			execute: function (complete) {

				var userInfoObject = new userAuthInfo(datacontext.Session.model.SessionID());
				userInfoObject.Username(_userName());
				userInfoObject.Password(_password());
				userInfoObject.RememberMe(_rememberMe());

				datacontext.Customer.authenticate(userInfoObject, successfulLogin);

				if (complete) { complete(); }
			},
			canExecute: function (isExecuting) {
				return !isExecuting;// && isDirty() && isValid();
			}
		}),

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) { callback(); }
		},
		/**   END Private Methods. */

		successfulLogin = function (customerResponse) {
//			alert('login\nusername:'+_userName()+'\npassword:'+_password()+'\nremember me:'+_rememberMe());
//			dataprimer.Fetch();

			amplify.publish('customerAuthentication', customerResponse);
			router.TransitionToLastView();
		},

		_signUp = function () {
			_editing(true);
			return true;
		},
		_cancelSignUp = function () {
			_editing(false);
			return true;
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
		editing: _editing,
		get Activate() { return _activate; },
		get Title() { return _title; },
		get userName() { return _userName; },
		get password() { return _password; },
		get rememberMe() { return _rememberMe; },
		get loginCmd() { return _loginCmd; },
		get SignUp() { return _signUp; },
		cancelSignUp: _cancelSignUp,
		signupVM: signupVM,
	};
});
