/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 6/3/13
 * Time: 9:43 AM
 * To change this template use File | Settings | File Templates.
 */
define('vm.billing',
[
	'config',
	'messenger'
],
function (config, messenger) {
	var
		/** START Private Properties. */
		_tmplName = 'billing.view',
		/**   END Private Properties. */
		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) callback();
		},
		_list = [
			{
				type: 'billing',
				invoiceID: 234562,
				time: 'Mar 3, 2013',
				billStatus: 'Past Due 120+'
			},
			{
				type: 'billing',
				invoiceID: 234342,
				time: 'Apr 3, 2013',
				billStatus: 'Past Due 90'
			},
			{
				type: 'billing',
				invoiceID: 234342,
				time: 'May 3, 2013',
				billStatus: 'Paid (5/4/2013)'
			}
		],

		init = function () {

		};
	/**   END Private Methods. */

	/** Initialize object. */
	init();

	/** Return object. */
	return {
		hash: config.Hashes.billing,
		ico: '&#59197;',
		type: 'billing',
		name: 'billing',
		list: _list,
		get Activate() { return _activate; },
		get TmplName() { return _tmplName; }
	};
});