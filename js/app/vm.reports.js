/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 6/4/13
 * Time: 3:00 PM
 * To change this template use File | Settings | File Templates.
 */
define("vm.reports",
[
	'config',
	'messenger'
],
function (config, messenger) {
	var
		/** START Private Properties. */
		_tmplName = 'reports.view',
		_tmplModelName = 'settings.model.view',
	/**   END Private Properties. */

		/** START Private Methods. */
			_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) callback();
		},
		/**   END Private Methods. */

			init = function () {
			/** Initialize view model. */
		};

	/** Init object. */
	init();

	/** Return object. */
	return {
		hash: config.Hashes.reports,
		ico: '&#128202;',
		type: 'reports',
		name: 'Reports',
		get Activate() { return _activate; },
		get TmplName() { return _tmplName; },
		get TmplModelName() { return _tmplModelName; }
	};
});