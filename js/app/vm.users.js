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
		_tmplModuleName = 'users.module.view',
		editing = ko.observable(false),
		editItem = ko.observable(null),
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
		startEdit = function(vm, evt) {
			editItem(vm);
			editing(true);
		},
		cancelEdit = function(vm, evt) {
			editing(false);
		},
		list = [
			{
				type: 'user',
				firstName: 'Bob',
				lastName: 'Bobbins',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'user',
				firstName: 'John',
				lastName: 'Smith',
				time: 'April 23, 2013 at 12:42pm'
			}
    ];

	/** Init object. */
	init();

	/** Return object. */
	return {
		editing: editing,
		editItem: editItem,
		startEdit: startEdit,
		cancelEdit: cancelEdit,
		hash: config.Hashes.users,
    ico: '&#128101;',
		type: 'users',
		name: 'Users',
		list: list,
		get Activate() { return _activate; },
		get TmplName() { return _tmplName; },
		get TmplModuleName() { return _tmplModuleName; }
	};
});
