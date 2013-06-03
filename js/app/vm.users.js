/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:31 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.users',
[
	'config',
	'messenger'
],
function (config, messenger) {
	var
		/** START Private Properties. */
		_tmplName = 'users.view',
		/**   END Private Properties. */

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) callback();
		},
		/**   END Private Methods. */

		init = function () {
			/** Initialize view model. */
		},
		list = [
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm',
			},
    ];

	/** Init object. */
	init();

	/** Return object. */
	return {
		hash: config.Hashes.users,
    ico: '&#128101;',
		type: 'users',
		name: 'Users',
		list: list,
		get Activate() { return _activate; },
		get TmplName() { return _tmplName; }
	};
});
