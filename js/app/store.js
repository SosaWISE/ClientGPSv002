/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/17/13
 * Time: 12:32 PM
 * To change this template use File | Settings | File Templates.
 */
define('store',
['jquery', 'amplify', 'config'],
function ($, amplify, config) {
	var
		expires = { expires: config.StoreExpirationMs },

		_clear = function (key) {
			return amplify.store(key, null);
		},

		_fetch = function (key) {
			return amplify.store(key);
		},

		_save = function (key, value) {
			amplify.store(key, value, expires);
		};

	/** Return object. */
	return {
		Clear: _clear,
		Fetch: _fetch,
		Save: _save
	};
});