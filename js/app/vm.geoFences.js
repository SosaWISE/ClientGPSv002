/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:27 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.geoFences',
['messenger'],
function (messenger) {
	var
		/** START Private Properties. */
			_tmplName = 'geoFences.view',
		/**   END Private Properties. */

		/** START Private Methods. */
			_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			refresh(callback);
		},
		/**   END Private Methods. */

			init = function () {
			/** Initialize view model. */
		};

	/** Init object. */
	init();

	/** Return object. */
	return {
		get Activate() { return _activate; },
		get TmplName() { return _tmplName; }
	};
});