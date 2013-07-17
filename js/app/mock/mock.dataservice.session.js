/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 10:40 AM
 * To change this template use File | Settings | File Templates.
 */
define(['amplify'],
function (amplify) {
	var _defineApi = function (model) {

		amplify.request.define('session-start', function (settings) {
			settings.success(model.SessionStart());
		});

		amplify.request.define('session-terminate', function (settings) {
			settings.success(model.SessionTerminate());
		});
	};

	return {
		get DefineApi() { return _defineApi; }
	};
});
