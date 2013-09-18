/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:31 PM
 * To change this template use File | Settings | File Templates.
 */
define([
	'underscore',
	'config',
	'messenger',
	'utils',
	'ko',
	'amplify',
	'dataservice'
], function(
	_,
	config,
	messenger,
	utils,
	ko,
	amplify,
	dataservice
) {
	/** START Private Properties. */
	var _tmplName = 'users.view',
		_tmplModuleName = 'users.module.view',
		editing = ko.observable(false),
		editItem = ko.observable(null),
		_users = ko.observableArray(),
		/**   END Private Properties. */

		/** START Private Methods. */
		_activate = function(routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) {
				callback();
			}
		},
		/**   END Private Methods. */

		init = function() {
			amplify.subscribe('customerAuthentication', function( /*data*/ ) {
				_refresh( /*data*/ );
			});
			amplify.subscribe('sessionAuthentication', function( /*data*/ ) {
				_refresh( /*data*/ );
			});
		},
		startEdit = function(vm) {
			editItem(vm);
			editing(true);
		},
		cancelEdit = function() {
			editing(false);
		},
		_refresh = function(callback) {
			dataservice.Users.getData({}, function(resp) {
				console.log(resp);
				if (resp.Code !== 0) {
					console.log("Error Retrieving Users: " + resp.Message);
					return;
				}

				_users([]);
				resp.Value.forEach(function(item) {
					_users.push({
						type: item.CustomerTypeUi,
						firstName: item.FirstName,
						lastName: item.LastName,
						time: utils.DateLongFormat(item.LastLoginOn)
					});
				});

				if (typeof(callback) === 'function') {
					callback();
				}
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
		Activate: _activate,
		TmplName: _tmplName,
		TmplModuleName: _tmplModuleName,
		Users: _users,
	};
});
