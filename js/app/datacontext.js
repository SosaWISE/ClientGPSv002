/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 9:39 AM
 * To change this template use File | Settings | File Templates.
 */
define('datacontext',
['jquery', 'underscore', 'ko', 'model', 'config', 'utils'],
function ($, _, ko, model, config, utils) {
	var logger = config.Logger,
		getCustomerId = function () { return config.CurrentUser().CustomerID(); },
		getAccountId = function () { return config.CurrentUser().AccountId();},
		/**
		 * @description Maps the memo to an observableArray, then returns the observableArray.
		 */
		itemsToArray = function (items, observableArray, filter, sortFunction) {
			/** Init. */
			if (!observableArray) return;

			// Create an array from the memo object
			var underlyingArray = utils.MapMemoToArray(items);

			if (filter) {
				underlyingArray = _.filter(underlyingArray, function(o) {
					var match = filter.predicate(filter, o);
					return match;
				});
			}
			if (sortFunction) {
				underlyingArray.sort(sortFunction);
			}
			//logger.info('Fetched, filtered and sorted ' + underlyingArray.length + ' records');
			observableArray(underlyingArray);
		},
		mapToContext = function(dtoList, items, results, mapper, filter, sortFunction) {
			// Loop through the raw dto list and populate a dictionary of the items
			items = _.reduce(dtoList, function(memo, dto) {
				var id = mapper.getDtoId(dto);
				var existingItem = items[id];
				memo[id] = mapper.fromDto(dto, existingItem);
				return memo;
			}, { });
			itemsToArray(items, results, filter, sortFunction);
			//logger.success('received with ' + dtoList.length + ' elements');
			return items; // must return these
		},
		EntitySet = function(getFunction, mapper, nullo, updateFunction) {
			var items = {},
			// returns the model item produced by merging dto into context
				mapDtoToContext = function(dto) {
					var id = mapper.getDtoId(dto);
					var existingItem = items[id];
					items[id] = mapper.fromDto(dto, existingItem);
					return items[id];
				},
				add = function(newObj) {
					items[newObj.id()] = newObj;
				},
				removeById = function(id) {
					delete items[id];
				},
				getLocalById = function(id) {
					// This is the only place we set to NULLO
					return !!id && !!items[id] ? items[id] : nullo;
				},
				getAllLocal = function() {
					return utils.MapMemoToArray(items);
				},
				getData = function(options) {
					return $.Deferred(function(def) {
						var results = options && options.results,
							sortFunction = options && options.sortFunction,
							filter = options && options.filter,
							forceRefresh = options && options.forceRefresh,
							param = options && options.param,
							getFunctionOverride = options && options.getFunctionOverride;

						getFunction = getFunctionOverride || getFunction;

						// If the internal items object doesnt exist,
						// or it exists but has no properties,
						// or we force a refresh
						if (forceRefresh || !items || !utils.HasProperties(items)) {
							getFunction({
								success: function(dtoList) {
									items = mapToContext(dtoList, items, results, mapper, filter, sortFunction);
									def.resolve(results);
								},
								error: function (response) {
									logger.error(config.toasts.errorGettingData);
									def.reject();
								}
							}, param);
						} else {
							itemsToArray(items, results, filter, sortFunction);
							def.resolve(results);
						}
					}).promise();
				},
				updateData = function(entity, callbacks) {

					var entityJson = ko.toJSON(entity);

					return $.Deferred(function(def) {
						if (!updateFunction) {
							logger.error('updateData method not implemented');
							if (callbacks && callbacks.error) { callbacks.error(); }
							def.reject();
							return;
						}

						updateFunction({
							success: function(response) {
								logger.success(config.toasts.savedData);
								entity.dirtyFlag().reset();
								if (callbacks && callbacks.success) { callbacks.success(); }
								def.resolve(response);
							},
							error: function(response) {
								logger.error(config.toasts.errorSavingData);
								if (callbacks && callbacks.error) { callbacks.error(); }
								def.reject(response);
								return;
							}
						}, entityJson);
					}).promise();
				};

			return {
				mapDtoToContext: mapDtoToContext,
				add: add,
				getAllLocal: getAllLocal,
				getLocalById: getLocalById,
				getData: getData,
				removeById: removeById,
				updateData: updateData
			};
		},

		/******************************
		 * Repositories
		 *
		 * Pass:
		 *  dataservice's 'get' method
		 *  model mapper
		 ******************************/
		customer = new EntitySet(dataservice.customer.getCustomer, modelmapper.customer, dataservice.customer.customerUpdate);
		session  = new EntitySet(dataservice.session.getSession, modelmapper.session, dataservice.session.sessionStart);

	/** Extensions. */
	customer.updateData = function (customerModel, callbacks) {
		var customerModelJson = ko.toJSON(customerModel);

		/** Make the call. */
		return $.Deferred(function (def) {
			dataservice.customer.customerUpdate({
				success: function (response) {
					logger.success(config.Toasts.savedData);
					customerModel.dirtyFlag().reset();
					if (callbacks && callbacks.success) { callbacks.success(); }
					def.resolve(response);
				},
				error: function (response) {
					logger.error(config.Toasts.errorSavingData);
					if (callbacks && callbacks.error) { callbacks.error(); }
					def.reject(response);
				}
			}, customerModelJson);
		}).promise();
	};

	customer.authenticate = function (customerModel, callbacks) {
		var customerModelJson = ko.toJSON(customerModel);

		/** Make the call. */
		return $.Deffered().promise(function(def) {
			dataservice.customer.customerAuth({
				success: function (response) {
					logger.success(config.Toasts.successfulAuth)
					def.resolve(response);
				},
				error: function (response) {
					logger.error(config.Toasts.failedAuth);
					def.refect(response);
				}
			}, customerModelJson);
		});

	};
});