/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/17/13
 * Time: 12:45 PM
 * To change this template use File | Settings | File Templates.
 */
define(['messenger', 'config'],
function (messenger, config) {
	var
		canLeaveCallback,
		self = this,

		viewModelActivated = function (options) {
			canLeaveCallback = options && options.canLeaveCallback;
		},

		_canLeave = function () {
			// Check the active view model to see if we can leave it.
			var val = canLeaveCallback ? canLeaveCallback() : true;
			return { val: val, message: config.Toasts.changesPending };
		},

		subscribeToViewModelActivations = function () {
			var context = self;
			messenger.Subscribe({
				topic: config.Messages.viewModelActivated,
				context: context,
				callback: viewModelActivated
			});
		},

		init = function () {
			subscribeToViewModelActivations();
		};

	init();

	/** Return object. */
	return {
		get CanLeave() { return _canLeave; }
	};
});
