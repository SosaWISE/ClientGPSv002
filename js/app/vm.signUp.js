/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 8/6/13
 * Time: 4:26 PM
 * To change this template use File | Settings | File Templates.
 */
define(['ko','messenger', 'model.user'],
function (ko, messenger, User) {
	/** Initialize. */
	var
	_model = new User(),
	/** START Private Methods. */
	_activate = function (routeData, callback) {
		messenger.publish.viewModelActivated();
		if (callback) { callback(); }
	},
	init = function () {
		_activate();
	},
	/**   END Private Methods. */

	_signUp = function () {
		debugger;
		alert(ko.toJSON(_model));
	};

	init();

	/** Return Object. */
	return {
		get Activate() { return _activate; },
		signUp: _signUp,
		model: _model,
	};

});
