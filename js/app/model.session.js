/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/17/13
 * Time: 9:39 AM
 * To change this template use File | Settings | File Templates.
 */
define(['ko'],
function (ko) {
	/** Define the object. */
	var
		_dc = null,

		Session = function () {
			var self = this;
			self.SessionID = ko.observable(0);
			self.ApplicationId = null;
			self.AuthCustomer = null;
			self.CreatedOn = null;
			self.IPAddress = null;
			self.LastAccessedOn = null;
			self.SessionTermindated = true;
			self.UserId = null;

			self.isBrief = ko.observable(false);
			self.isNullo = false;
			self.dirtyFlag = new ko.DirtyFlag([
			]);

			/** Return object. */
			return self;
		};

	Session.Nullo = new Session();
	Session.Nullo.isNullo = true;
	Session.Nullo.isBrief = function () { return false; };  // nullo is never brief.
	Session.Nullo.dirtyFlag().reset();

	/** Static memeber. */
	Session.datacontext = function (dc) {
		if (dc) { _dc = dc; }
		return _dc;
	};

	/** Return session. */
	return Session;
});
