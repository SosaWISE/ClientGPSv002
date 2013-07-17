/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 6/5/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'config',
	'messenger'
],
function (config, messenger) {
	var
		/** START Private Properties. */
		_tmplName = 'settings.view',
		_tmplModuleName = 'settings.module.view',
		_ico = '&#9881;',
		_type = 'settings',
		_name = 'Settings',
		/**   END Private Properties. */

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) callback();
		},
		/**   END Private Methods. */
		init = function () {
			/** Initialize viewmodel. */
		};

	/** Init object. */
	init();

	/** Return object. */
	return {
		hash: config.Hashes.settings,
		ico: _ico,
		type: _type,
		name: _name,
		get Activate() { return _activate; },
		get TmplName() { return _tmplName; },
		get TmplModuleName() { return _tmplModuleName; }
	};
});
