/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/22/13
 * Time: 6:28 PM
 * To change this template use File | Settings | File Templates.
 */
define('dataservice.users',
['amplify','config'],
function (amplify, config) {
	var
	/** START Initialize object. */
		_init = function () {

			amplify.request.define('users-getData', 'ajax', config.AjaxProps('AuthSrv/UsersRead'));
	};
	/**   END Initialize object. */

	/** START Public Methods. */
	_getData = function (callbacks, data) {
		return amplify.request({
			resourceId: 'users-getData',
			data: data,
			success: callbacks.success,
			error: callbacks.error
		});
	};
		/**   END Public Methods. */

	/** Init object. */
	_init();

	/** Return object. */
	return {
		get GetData() { return _getData; }
	};
});