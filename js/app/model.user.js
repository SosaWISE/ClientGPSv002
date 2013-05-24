/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/23/13
 * Time: 9:31 AM
 * To change this template use File | Settings | File Templates.
 */
define('model.user',
['ko', 'config'],
function (ko, config) {
	/** Init. */
	var
		_dc = null,

		settings = {},

		User = function () {
			/** Init. */
			var self = this;
			self.UserID = ko.observable();
			self.sessionID = ko.observable();
			self.customerTypeId = ko.observable();
			self.customerMasterFileId = ko.observable();
			self.dealerId = ko.observable();
			self.dealerName = ko.observable();
			self.localizationId = ko.observable();
			self.localizationName = ko.observable();
			self.prefix = ko.observable();
			self.firstname = ko.observable().extend({ required: true });
			self.middleName = ko.observable();
			self.lastname = ko.observable().extend({ required: true });
			self.postfix = ko.observable();
			self.fullname = ko.computed(function () {
				return self.firstname() + ' ' + self.lastname();
			}, self);
			self.gender = ko.observable().extend({ required: true });
			self.phoneHome = ko.observable();
			self.phoneWork = ko.observable();
			self.phoneCell = ko.observable();
			self.email = ko.observable().extend({ required: true });
			self.dob = ko.observable();
			self.ssn = ko.observable();
			self.username = ko.computed(function () {
				return self.email();
			});
			self.blog = ko.observable().extend({
				pattern: {
					message: 'Not a valid url',
					params: settings.urlRegEx
				}
			});
			self.twitter = ko.observable().extend({
				pattern: {
					message: 'Not a valid twitter id',
					params: settings.twitterRegEx
				}
			});
			self.twitterLink = ko.computed(function () {
				return self.twitter() ? settings.twitterUrl + self.twitter() : '';
			});
			self.lastLogin = ko.observable();
			self.customerHash = ko.computed(function () {
				return config.Hashes.users + '/' + self.UserID();
			});

			self.isBrief = ko.observable(true);
			self.isNullo = false;
			self.dirtyFlag = new ko.DirtyFlag([
				self.firstname,
				self.lastname,
				self.gender,
				self.email
			]);

			/** Return object. */
			return self;
		};

	User.Nullo = new User();
	User.Nullo.isNullo = true;
	User.Nullo.isBrief = function () { return false; };  // nullo is never brief.
	User.Nullo.dirtyFlag().reset();

	/** Static memeber. */
	User.datacontext = function (dc) {
		if (dc) { _dc = dc; }
		return _dc;
	};

	/** Return the object. */
	return User;
});