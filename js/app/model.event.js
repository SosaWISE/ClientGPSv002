/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/22/13
 * Time: 9:48 AM
 * To change this template use File | Settings | File Templates.
 */
define('model.event',
['ko'],
function (ko) {
	/** Define model. */
	var Event = function () {
		var self = this;

		self.EventID = ko.observable();
	};

	/** Return object. */
	return Event;
});