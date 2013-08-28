/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 4:04 PM
 * To change this template use File | Settings | File Templates.
 */
define(['ko', 'config'],
	function (ko, config) {
		/** Init */
		var
			_dc = null,

			settings = {
				imageBasePath: '../content/images/photos/',
				unknownPersonImageSource: 'unknown_customer.jpg',
				twitterUrl: 'http://twitter.com/',
				twitterRegEx: /[@]([A-Za-z0-9_]{1,15})/i,
				urlRegEx: /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i
			},

			Customer = function () {
				/** Init. */
				var self = this;
				self.customerID = ko.observable();
				self.sessionID = ko.observable();
				self.customerTypeId = ko.observable();
				self.customerMasterFileId = ko.observable();
				self.leadSourceId = ko.observable(config.DefaultProperties.leadSourceId);
				self.leadDispositionId = ko.observable(config.DefaultProperties.leadDispositionId);
				self.dealerId = ko.observable(config.DefaultProperties.dealerId);
				self.dealerName = ko.observable();
				self.salesRepId = ko.observable(config.DefaultProperties.salesRepId);
				self.localizationId = ko.observable(config.DefaultProperties.localizationId);
				self.localizationName = ko.observable();
				self.prefix = ko.observable();
				self.firstname = ko.observable().extend({ required: true });
				self.middleName = ko.observable();
				self.lastname = ko.observable().extend({ required: true });
				self.postfix = ko.observable();
				self.fullname = ko.computed(function () {
					return self.firstname() + ' ' + self.lastname();
				}, self);
				self.gender = ko.observable('Not Set').extend({ required: true });
				self.phoneHome = ko.observable();
				self.phoneWork = ko.observable();
				self.phoneCell = ko.observable();
				self.email = ko.observable().extend({ required: true });
				self.dob = ko.observable();
				self.ssn = ko.observable();
				self.username = ko.observable();
				self.password = ko.observable();
				self.rememberMe = ko.observable(false);
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
					return config.Hashes.customers + '/' + self.customerID();
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

		Customer.Nullo = new Customer()
			.customerID(0)
			.dealerId(config.DefaultProperties.dealerId)
			.salesRepId(config.DefaultProperties.salesRepId)
			.localizationId(config.DefaultProperties.localizationId)
			.firstname('Not a')
			.lastname('Customer')
			.gender('M');
		Customer.Nullo.isNullo = true;
		Customer.Nullo.isBrief = function () { return false; };  // nullo is never brief.
		Customer.Nullo.dirtyFlag().reset();

		/** Static memeber. */
		Customer.datacontext = function (dc) {
			if (dc) { _dc = dc; }
			return _dc;
		};

		/** Return the object. */
		return Customer;
	});
