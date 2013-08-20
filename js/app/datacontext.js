/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 9:39 AM
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','underscore','ko','model','model.mapper','dataservice','config','utils'],
function ($, _, ko, model, modelMapper, dataService, config, utils) {
	var logger = config.Logger,
		/**
		 * @description Maps the memo to an observableArray, then returns the observableArray.
		 */
		itemsToArray = function (items, observableArray, filter, sortFunction) {
			/** Init. */
			if (!observableArray) { return; }

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
								success: function(response) {
									if (response.Code === 0)
									{
										items = mapToContext(response.Value, items, results, mapper, filter, sortFunction);
										def.resolve(results);
										return;
									}
									/** Default path of execution. */
									logger.error(config.Toasts.errorGettingData);
									def.reject();
								},
								error: function (/*response*/) {
									logger.error(config.Toasts.errorGettingData);
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
								// logger.success(config.toasts.savedData);
								entity.dirtyFlag().reset();
								if (callbacks && callbacks.success) { callbacks.success(response); }
								def.resolve(response);
							},
							error: function(response) {
								// logger.error(config.toasts.errorSavingData);
								if (callbacks && callbacks.error) { callbacks.error(response); }
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
		Entity = function (getFunction, mapper, nullo) {
			var _entity = nullo,
				mapDtoToContext = function (dto) {
					_entity = mapper.fromDto(dto, _entity);
					return _entity;
				},
				getData = function (options) {
					return $.Deferred(function (def) {
						var forceRefresh = options && options.forceRefresh,
							param = options && options.param,
							getFunctionOverride = options && options.getFunctionOverride;

						getFunction = getFunctionOverride || getFunction;

						/** Check to se if we are refreshing. */
						if (_entity === nullo || forceRefresh) {
							getFunction ({
								success: function(dto) {
									_entity = mapDtoToContext(dto);
									def.resolve(_entity);
								},
								error: function (response) {
									logger.error(config.Toasts.errorSessionStart);
									def.reject(response);
								}
							}, param);
						} else {
							def.resolve(_entity);
						}
					}).promise();
				};

			return {
				get MapDtoToContext() { return mapDtoToContext; },
				get GetData() { return getData; }
			};
		},

		/******************************
		 * Repositories
		 *
		 * Pass:
		 *  dataservice's 'get' method
		 *  model mapper
		 ******************************/
		_session  = new Entity(dataService.Session.SessionStart, modelMapper.Session, model.Session.Nullo),
		_customer = new Entity(dataService.Customer.CustomerAuth, modelMapper.Customer, model.Customer.Nullo),
		_devices = new EntitySet(dataService.Devices.AcquireList, modelMapper.Device, dataService.Devices.Nullo, dataService.Devices.SaveData),
		_events = new EntitySet(dataService.Events.GetData, modelMapper.Event, dataService.Events.Nullo),
		_geoFences = new EntitySet(dataService.GeoFences.GetData, modelMapper.GeoFence, dataService.GeoFences.Nullo, dataService.GeoFences.SaveData),
		_users = new EntitySet(dataService.Users.GetData, modelMapper.User, dataService.Users.Nullo);

	/** Extensions. */
	_session.SessionStart = function () {
		return $.Deferred(function (def) {
			dataService.Session.SessionStart({
				success: function (response) {
					if (response.Code !== 0) {
						logger.error(config.Toasts.errorSessionStart);
						def.reject(response);
						return;
					}

					_session.SessionID = response.SessionId;
					logger.success(config.Toasts)
				},
				error: function (response) {
					logger.error(config.Toasts.errorSessionStart);
					def.reject(response);
				}
			});
		}).promise();
	};
	_session.model = model.Session.Nullo;

	_customer.updateData = function (customerModel, callbacks) {
		var customerModelJson = ko.toJSON(customerModel);

		/** Make the call. */
		return $.Deferred(function (def) {
			dataService.Customer.customerUpdate({
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

	_customer.authenticate = function (customerModel, callbacks) {
		var customerModelJson = ko.toJSON(customerModel);

		/** Make the call. */
		return $.Deferred(function(def) {
			dataService.Customer.CustomerAuth({
				success: function (response) {
					/** Check result. */
					if (response.Code === 0)
					{
						_customer.model = _customer.MapDtoToContext(response.Value);
						config.CurrentUser(_customer.model);
						logger.success(config.Toasts.successfulAuth);
						if (callbacks) callbacks(response);
						def.resolve(response);
						return;
					}

					/** Default path of execution. */
					logger.error(config.Toasts.failedAuth);
					def.reject(response);
				},
				error: function (response) {
					logger.error(config.Toasts.failedAuth);
					def.reject(response);
				}
			}, customerModelJson);
		}).promise();
	};
	_customer.model = model.Customer.Nullo;

	var datacontext = {
		get Customer() { return _customer; },
		get Session() { return _session; },
		get Devices() { return _devices; },
		get Events() { return _events; },
		get GeoFences() { return _geoFences; },
		get Users() { return _users; }
	};

	// We did this so we can access the datacontext during ist construction
	model.setDataContext(datacontext);

	/** Return object. */
	return datacontext;
});
