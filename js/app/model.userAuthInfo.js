/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 6/7/13
 * Time: 12:22 PM
 * To change this template use File | Settings | File Templates.
 */
define('model.userAuthInfo',
['ko'],
function (ko) {
	/** Init. */
	var
		_dc = null,

		UserAuthInfo = function (sessionId) {
			/** Init */
			var self = this;
			self.Username = ko.observable();
			self.Password = ko.observable();
			self.SessionID = ko.observable(sessionId);
			self.RememberMe = ko.observable(false);
			self.isNullo = false;
			self.dirtyFlag = new ko.DirtyFlag([
				self.username,
				self.password,
				self.rememberMe
			]);

			/** Return object. */
			return self;
		};

	UserAuthInfo.Nullo = new UserAuthInfo();
	UserAuthInfo.Nullo.isNullo = true;
	UserAuthInfo.isBrief = function () { return false; };  // Nullo is never brief.
	UserAuthInfo.Nullo.dirtyFlag().reset();

	/** Static Member. */
	UserAuthInfo.datacontext = function (dc) {
		if (dc) { _dc = dc; }
		return _dc;
	};

	/** Return object definition. */
	return UserAuthInfo;
});