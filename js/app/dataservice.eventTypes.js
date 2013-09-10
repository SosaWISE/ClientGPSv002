/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 9/04/13
 * Time: 04:19 PM
 * To change this template use File | Settings | File Templates.
 */
define(['amplify','amplify.request','config','ko'],
function (amplify, amplify_request, config, ko) {
	/** START Initialize. */
	var
		_init = function () {
			amplify.request.define('eventTypes-Read', 'ajax', config.AjaxProps('Device/EventTypesReadAll'));
	},
	/** END   Initialize. */

	/** START Public Methods. */
	_readAll = function (callbacks, data) {
		/** Init. */
		var jsonData = ko.toJSON(data);

		return amplify.request({
			resourceId: 'eventTypes-Read',
			data: jsonData,
			success: callbacks.success,
			error: callbacks.error
		});
	};
	/** END   Public Methods. */

	/** Init object.  */
	_init();

	/** Return object. */
	return {
		get GetData() { return _readAll; }
	};
});
