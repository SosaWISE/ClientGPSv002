/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/18/13
 * Time: 10:55 AM
 * To change this template use File | Settings | File Templates.
 */
define('dataprimer',
[
//	'vm',
	'jquery',
	'ko',
	'datacontext',
	'config',
	'utils',
	'moment',
	'amplify'
],
function (/*vm, */$, ko, datacontext, config, utils, moment, amplify) {
	var logger = config.Logger,

		_sessionStart = function () {
			return $.Deferred(function (def) {
				var data = { session: ko.observable() };

				$.when(datacontext.Session.GetData({ results: data.session }))
				.fail(function () {
					def.reject();
				})
				.done(function (result) {
					datacontext.Session.model = result;
					/** Check to see if we are authenticated. */
					if (result.AuthCustomer)
					{
						datacontext.Customer.model = datacontext.Customer.MapDtoToContext(result.AuthCustomer);
						config.CurrentUser(datacontext.Customer.model);
						//_fetch();
						amplify.publish('sessionAuthentication', result.AuthCustomer);
					}
					def.resolve(result);
				});
			}).promise();
		},
//
		_fetch = function () {
			return $.Deferred(function (def) {
				var data = {
					devices:  ko.observableArray(),
					events: ko.observableArray(),
					geoFences: ko.observableArray(),
					users: ko.observableArray()
				};

				$.when(
					// datacontext.Session.GetData({ result: data.session }),
					datacontext.Devices.getData(
						{
							results: data.devices,
							param: {
								UniqueID: datacontext.Customer.model.customerMasterFileId()
							}
						}
					),
					datacontext.Events.getData(
						{
							results: data.events,
							param: {
								CMFID: datacontext.Customer.model.customerMasterFileId(),
								//CustomerID: datacontext.Customer.model.customerID(),
								StartDate: utils.AddToDate(new Date(), -30),
								EndDate:  moment(new Date()).toDate(),
								PageSize: 20,
								PageNumber: 1
							}
						}
					),
					datacontext.GeoFences.getData(
						{
							results: data.geoFences,
							param: {
								CMFID: datacontext.Customer.model.customerMasterFileId(),
								CustomerID: datacontext.Customer.model.customerID()
							}
						}
					)
//					datacontext.Users.getData({ results: data.users })
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
						def.reject();
				})

				.done(function () {
						def.resolve(data);
				});

			}).promise();
		},
		init = function () {
//			console.log("Print vm");
//			console.log(vm);
//			console.log("Print moment");
//			console.log(moment);
		};

	/** Init object. */
	init();

	/** Return object. */
	return {
		get SessionStart() { return _sessionStart; },
		get Fetch() { return _fetch; }
	};
});
