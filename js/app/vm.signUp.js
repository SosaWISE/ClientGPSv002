/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 8/6/13
 * Time: 4:26 PM
 * To change this template use File | Settings | File Templates.
 */
define(['ko','messenger'],
function (ko, messenger) {
	/** Initialize. */
	var
		_signUpTitle = ko.observable('Sign Up'),
		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) callback();
		},
		init = function () {
			_activate();
		};
		/**   END Private Methods. */

	init();

	/** Return Object. */
	return {
		TmplName: 'signUp.view',
		get SignUpTitle() { return _signUpTitle; },
		get Activate() { return _activate; }
	};

});