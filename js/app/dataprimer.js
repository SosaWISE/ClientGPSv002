/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/18/13
 * Time: 10:55 AM
 * To change this template use File | Settings | File Templates.
 */
define('dataprimer',
['jquery', 'ko', 'datacontext', 'config'],
function ($, ko, datacontext, config) {
	var logger = config.logger,

		_sessionStart = function () {
			return $.Deferred(function (def) {
				var data = { session: ko.observable() };

				$.when(datacontext.Session.GetData({ results: data.session }))
				.fail(function () {
					def.reject();
				})
				.done(function (result) {
					def.resolve(result);
				});
			}).promise();
		},

		_fetch = function () {
			return $.Deferred(function (def) {
				var data = {
					devices: ko.observableArray(),
					events: ko.observableArray(),
					geoFences: ko.observableArray(),
					users: ko.observableArray()
				};

				$.when(
					// datacontext.Session.GetData({ result: data.session }),
					datacontext.Devices.getData({ results: data.devices }),
					datacontext.Events.getData({ results: data.events }),
					datacontext.GeoFences.getData({ results: data.geoFences }),
					datacontext.Users.getData({ results: data.users })
				)

				.pipe(function () {
					logger.success('Fetch data for: '
						+ '<div>' + data.devices().length + ' devices </div>'
						+ '<div>' + data.events().length + ' events </div>'
						+ '<div>' + data.geoFences().length + ' geoFences </div>'
						+ '<div>' + data.users().length + ' users </div>'
					);
				})

				.fail(function () {
						def.reject(); })

				.done(function () {
						def.resolve(); });

			}).promise();
		};

	/** Return object. */
	return {
		get SessionStart() { return _sessionStart; },
		get Fetch() { return _fetch; }
	};
});
