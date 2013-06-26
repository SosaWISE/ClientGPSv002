/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.devices-tab',
['jquery','messenger','underscore','datacontext','ko','amplify'],
function ($, messenger, _, datacontext, ko, amplify) {
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
			_list(list);
			amplify.subscribe('customerAuthentication', function (data) {
				console.log(data);
				_refresh();
			});
			amplify.subscribe('sessionAuthentication', function (data) {
				console.log(data);
				_refresh();
			});
		},
			_refresh = function () {
			/** Init. */
			var data = {
				devices: ko.observableArray()
			};

			/** Initialize view model. */
			$.when(
				datacontext.Devices.getData(
					{
						results: data.devices,
//						results: _list,
						param: {
							UniqueID: datacontext.Customer.model.customerMasterFileId()
						}
					}
				)
			)
			.then(function (response) {
				/** Init. */
				console.log(response);

				_list.destroyAll();
				_.each(data.devices(), function (item) {
					_list.push({
						type: item.type(),
						title: item.title(),
						time: item.time()
					});
				});
				}, function (someArg) {
					alert('SomeArg:' + someArg);
			});
			//_list(list);
		},
		startEdit = function(vm/*, evt*/) {
			alert("Yeah baby.  I'm here!!!  Yeah!!!!!");
			editItem(vm);
			editing(true);
		},
		cancelEdit = function(/*vm, evt*/) {
			editing(false);
		},
		_addDevice = function() {
			alert("What up");
			_list.push({
				type: 'Added one',
				title: 'Andresss\'s Watch',
				time: 'April 23, 2013 at 12:42pm'
			});
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
		get refresh() { return _refresh },
		get addDevice() { return _addDevice; },
		type: 'devices',
		name: 'Devices',
		get list() { return _list; },
		active: ko.observable(false),
		get Activate() { return _activate; }
	};
});
