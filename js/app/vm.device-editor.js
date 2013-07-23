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
		focusName = ko.observable(false),
		editing = ko.observable(false),
		resetHack = null,

		/**   END Private Properties. */

		start = function (deviceModel) {
			resetHack = deviceModel.DeviceName();
			model(deviceModel);
			focusName(true);
			editing(true);
		},
		stop = function (cancel) {
			if (cancel) {
				//@TODO: reset all changes on model
				model().DeviceName(resetHack);
			}
			//model(null); // messes with view model
			//focusName(false); // it should've already lost focus
			editing(false);
		};

	/** Return object. */
	//noinspection JSUnusedGlobalSymbols
	return {
		model: model,
		focusName: focusName,
		editing: editing,
		start: start,
		stop: stop,
	};
});
