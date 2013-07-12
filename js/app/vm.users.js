/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:31 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.users',
[
	'underscore',
	'config',
	'messenger',
	'utils',
	'ko',
	'amplify',
	'datacontext'
],
function (_, config, messenger, utils, ko, amplify, datacontext) {
	var
		/** START Private Properties. */
		_tmplName = 'users.view',
		_tmplModuleName = 'users.module.view',
		editing = ko.observable(false),
		editItem = ko.observable(null),
		_users = ko.observableArray(),
		/**   END Private Properties. */

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) callback();
		},
		/**   END Private Methods. */

			init = function () {
			amplify.subscribe('customerAuthentication', function (/*data*/) {
				_refresh(/*data*/);
			});
			amplify.subscribe('sessionAuthentication', function (/*data*/) {
				_refresh(/*data*/);
			});
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
    ],
		_refresh = function (callback) {
			/** Init. */
			var data = {
				users: ko.observableArray()
			};

			/** Initialize view model. */
			$.when(datacontext.Users.getData(
				{
					results: data.users,
					param: {}
				}
			))
			.then(function (response) {
				console.log(response);
				_users.removeAll();

				/** Initialize. */
				_.each(data.users(), function (item) {
					_users.push({
						type: item.customerTypeUi(),
						firstName: item.firstName(),
						lastName: item.lastName(),
						time: utils.DateLongFormat(item.lastLoginOn())
					});
				});

				utils.InvokeFunctionIfExists(callback);
			}, function (someArg) {
					console.log("Error Retrieving Users: " + someArg);
				});
		};

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
		list: _users,
		get Activate() { return _activate; },
		get TmplName() { return _tmplName; },
		get TmplModuleName() { return _tmplModuleName; },
		get Users() { return _users; }
	};
});
