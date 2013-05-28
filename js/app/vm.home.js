/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/24/13
 * Time: 5:15 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.home',
['messenger','utils'],
function (messenger, utils) {
	var
		_activate = function (routeData, callback) {
			messenger.Publish.viewModelActivated({canleaveCallback: canLeave});
			refresh(callback);
		},
		canLeave = function () {
			return true;
		},
		refresh = function (callback) {
			utils.InvokeFunctionIfExists(callback);
		};

	/** Return object. */
	return {
		get Activate() { return _activate; }
	};
});