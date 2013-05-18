/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/17/13
 * Time: 9:39 AM
 * To change this template use File | Settings | File Templates.
 */
define('model.session',
['ko'],
function (ko) {
	/** Define the object. */
	var Session = function () {
		var self = this;
		self.SessionID = ko.observable();
	};

	/** Return session. */
	return Session;
});