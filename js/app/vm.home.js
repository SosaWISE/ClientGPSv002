/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/24/13
 * Time: 5:15 PM
 * To change this template use File | Settings | File Templates.
 */
define('vm.home',
['messenger'],
function (messenger) {
	var
		_activate = function () {
			messenger.Publish.viewModelActivated();
		};

	/** Return object. */
	return {
		get Activate() { return _activate; }
	};
});