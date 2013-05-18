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

		fetch = function () {
			return $.Deferred(function (def) {
				var data = {
					devices: ko.observableArray(),
					events: ko.observableArray(),
					geoFences: ko.observableArray(),
					users: ko.observableArray()
				};

				$.when(
					datacontext.devices.getData({ results: data.devices }),
					datacontext.events.getData({ results: data.events }),
					datacontext.geoFences.getData({ results: data.geoFences }),
					datacontext.users.getData({ results: data.users })
				)

				.pipe(function () {
					logger.success('Fetch data for: '
						+ '<div>' + data.devices().length + ' devices </div>'
						+ '<div>' + data.events().length + ' events </div>'
						+ '<div>' + data.geoFences().length + ' geoFences </div>'
						+ '<div>' + data.users().length + ' users </div>'
					);
				})

				.fail(function () { def.reject(); })

				.done(function () { def.resolve(); });

			}).promise();
		};

	/** Return object. */
	return {
		get Fetch() { return fetch; }
	};
});