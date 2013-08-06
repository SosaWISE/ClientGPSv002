/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','messenger','underscore','datacontext','ko','amplify','vm.model-editor','model.mapper'],
function ($, messenger, _, datacontext, ko, amplify, modelEditor, modelMapper) {
// wrap in create function in order to create multiple instances
return (function create() {
	var
		/** START Private Properties. */
		saving = ko.observable(false),
		_list = ko.observableArray(),
		_devices,
		editorVM = modelEditor.create(),
		/**   END Private Properties. */

		/** START Private Methods. */
		_activate = function (routeData, callback) {
			messenger.publish.viewModelActivated();
			if (callback) { callback(); }
		},
		/**   END Private Methods. */

		init = function (devices) {
			_devices = devices;
			_list(list);

			amplify.subscribe('customerAuthentication', function (data) {
				console.log(data);
				refresh();
			});
			amplify.subscribe('sessionAuthentication', function (data) {
				console.log(data);
				refresh();
			});

			refresh();
		},
		refresh = function () {
			_list.destroyAll();
			/** Initialize view model. */
			$.when(
				datacontext.Devices.getData(
					{
						results: _list,
						param: {
							UniqueID: datacontext.Customer.model.customerMasterFileId()
						}
					}
				)
			)
			.then(function (response) {
				console.log(response);
			}, function (someArg) {
					alert('SomeArg:' + someArg);
			});
		},
		startEdit = function(model) {
			editorVM.start(model);
		},
		cancelEdit = function() {
			editorVM.stop(true);
		},
		saveEdit = function() {
			editorVM.stop(false);
			saving(true);
			datacontext.Devices.updateData(editorVM.model(), {
				success: function () {
					saving(false);
				},
				error: function () {
					saving(false);
				}
			});
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
				UIName: 'watch ME DUDE',
				AccountName: 'Austin\'s Watch',
				EventDate: 'April 23, 2013 at 12:42pm',
			},
			{
				UIName: 'watch',
				AccountName: 'Tyler\'s Watch',
				EventDate: 'April 23, 2013 at 12:42pm',
			},
			{
				UIName: 'watch',
				AccountName: 'Ethan\'s Watch',
				EventDate: 'April 23, 2013 at 12:42pm',
			},
			{
				UIName: 'child',
				AccountName: 'Zak\'s Child Tracker',
				EventDate: 'April 23, 2013 at 12:42pm',
			},
			{
				UIName: 'phone',
				AccountName: 'Austin\'s Phone',
				EventDate: 'April 23, 2013 at 12:42pm',
			},
			{
				UIName: 'home',
				AccountName: 'Our Home Alarm',
				EventDate: 'April 23, 2013 at 12:42pm',
			},
			{
				UIName: 'watch',
				AccountName: 'Carolyn\'s Phone',
				EventDate: 'April 23, 2013 at 12:42pm',
			},
			{
				UIName: 'phone',
				AccountName: 'Mark\'s Phone',
				EventDate: 'April 23, 2013 at 12:42pm',
			},
			{
				UIName: 'car-nav',
				AccountName: 'Austin\'s Car GPS',
				EventDate: 'April 23, 2013 at 12:42pm',
			}
		].map(function (dto) {
			return modelMapper.Device.fromDto(dto);
		});

	/** Return object. */
	//noinspection JSUnusedGlobalSymbols
	return {
		init: init,
		create: create,
		editorVM: editorVM,
		TmplName: 'devices-tab.view',
		canEdit: ko.observable(true),
		editing: editorVM.editing,
		editItem: ko.observable(editorVM),
		saving: saving,
		startEdit: startEdit,
		cancelEdit: cancelEdit,
		saveEdit: saveEdit,
		get refresh() { return refresh; },
		get addDevice() { return _addDevice; },
		type: 'devices',
		name: 'Devices',
		get list() { return _list; },
		active: ko.observable(false),
		get Activate() { return _activate; }
	};
})();
});
