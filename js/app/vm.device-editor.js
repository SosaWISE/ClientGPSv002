/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
define(['messenger','datacontext','ko',],
function (messenger, datacontext, ko) {
	var
		/** START Private Properties. */
		model = ko.observable(null),
		focusTitle = ko.observable(false),

		/**   END Private Properties. */

		start = function (deviceModel) {
			model(deviceModel);
			focusTitle(true);
		};

	/** Return object. */
	//noinspection JSUnusedGlobalSymbols
	return {
		model: model,
		focusTitle: focusTitle,
		start: start,
	};
});
