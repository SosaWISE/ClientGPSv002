/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.devices-tab',
['jquery','messenger','underscore','datacontext','ko'],
function ($, messenger, _, datacontext, ko) {
	var
		/** START Private Properties. */
		editing = ko.observable(false),
		editItem = ko.observable(null),
		_list = ko.observableArray(),

		/**   END Private Properties. */

		/** START Private Methods. */
			_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) callback();
		},
		/**   END Private Methods. */

			init = function () {
			debugger;
			/** Init. */
			var data = {
				devices: ko.observableArray()
			};

			/** Initialize view model. */
			$.when(
				datacontext.Devices.getData(
					{
						results: data.devices,
						param: {
							UniqueID: datacontext.Customer.model.customerMasterFileId()
						}
					}
				)
			)
			.done(function (response) {
				/** Init. */
				debugger;
				_list.clear();
				_.each(data.devices(), function (item) {
					_list.add({
						type: item.type,
						title: item.title,
						time: item.time
					});
				});
			});
//
//			/** Create new list. */
//			_.each(listResult, function(item) {
//				_list.add({
//					type: item.PanelTypeId,
//					title: item.AccountName,
//					time: 'Not set yet' + item.AccountId
//				});
//			});
		},
		startEdit = function(vm/*, evt*/) {
			editItem(vm);
			editing(true);
		},
		cancelEdit = function(/*vm, evt*/) {
			editing(false);
		},
		list = [
			{
				type: 'watch ME DUDE',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'watch',
				title: 'Tyler\'s Watch',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'watch',
				title: 'Ethan\'s Watch',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'child',
				title: 'Zak\'s Child Tracker',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'phone',
				title: 'Austin\'s Phone',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'home',
				title: 'Our Home Alarm',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'watch',
				title: 'Carolyn\'s Phone',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'phone',
				title: 'Mark\'s Phone',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'car-nav',
				title: 'Austin\'s Car GPS',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'car',
				title: 'Carolyn\'s Car Tracker',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm'
			},
			{
				type: 'watch',
				title: 'Austin\'s Watch',
				time: 'April 23, 2013 at 12:42pm'
			}
		];

	/** Init object. */
	init();

	/** Return object. */
	return {
		TmplName: 'devices-tab.view',
		canEdit: ko.observable(true),
		editing: editing,
		editItem: editItem,
		startEdit: startEdit,
		cancelEdit: cancelEdit,
		type: 'devices',
		name: 'Devices',
		list: _list,
		active: ko.observable(false),
		get Activate() { return _activate; }
	};
});
