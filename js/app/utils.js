/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/15/13
 * Time: 9:58 AM
 * To change this template use File | Settings | File Templates.
 */
define('utils',
	['underscore', 'moment'],
	function(_, moment) {
		/** Initialize. */
		var
			endOfDay = function (day) {
				return moment(new Date(day))
					.add('days', 1)
					.add('seconds', -1)
					.toDate();
			},
			_addToDate = function (day, daysToAdd){
				var result = new Date();

				result.setDate(day.getDate() + daysToAdd);

				/** Return result. */
				return result;
			},
			getFirstTimeSlot = function (timeSlots) {
				return moment(timeSlots()[0].start()).format('MM-DD-YYYY');
			},
			hasProperties = function(obj) {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						return true;
					}
				}
				return false;
			},
			invokeFunctionIfExists = function (callback) {
				if (_.isFunction(callback)) {
					callback();
				}
			},
			mapMemoToArray = function (items) {
				var underlyingArray = [];
				for (var prop in items) {
					if (items.hasOwnProperty(prop)) {
						underlyingArray.push(items[prop]);
					}
				}
				return underlyingArray;
			},
			regExEscape = function(text) {
				// Removes regEx characters from search filter boxes in our app
				return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			},

			restoreFilter = function (filterData) {
				var stored = filterData.stored,
					filter = filterData.filter,
					dc = filterData.datacontext;

				// Create a list of the 5 filters to process
				var filterList = [
					{ raw: stored.favoriteOnly, filter: filter.favoriteOnly },
					{ raw: stored.searchText, filter: filter.searchText },
					{ raw: stored.speaker, filter: filter.speaker, fetch: dc.persons.getLocalById },
					{ raw: stored.timeslot, filter: filter.timeslot, fetch: dc.timeslots.getLocalById },
					{ raw: stored.track, filter: filter.track, fetch: dc.tracks.getLocalById }
				];

				// For each filter, set the filter to the stored value, or get it from the DC
				_.each(filterList, function (map) {
					var rawProperty = map.raw, // POJO
						filterProperty = map.filter, // observable
						fetchMethod = map.fetch;
					if (rawProperty && filterProperty() !== rawProperty) {
						if (fetchMethod) {
							var obj = fetchMethod(rawProperty.id);
							if (obj) {
								filterProperty(obj);
							}
						} else {
							filterProperty(rawProperty);
						}
					}
				});
			},

			_dateLongFormat = function (rawDate) {
				/** Init. */
				var result = '[Invalid Date]';

				/** Validate input. */
				if (moment(rawDate).isValid) {
					result = moment.utc(rawDate).format('MMMM Do, YYYY @ hh:mm a');
				}

				/** Return result. */
				return result;
			},

			_getNowDateTime = function () {
				/** Init */
				var now = new Date();

				/** Return value. */
				return now;
			};

		/** Return object. */
		return {
			get EndOfDay() { return endOfDay; },
			get AddToDate() { return _addToDate; },
			get GetFirstTimeSlot() { return getFirstTimeSlot; },
			get HasProperties() { return hasProperties; },
			get InvokeFunctionIfExists() { return invokeFunctionIfExists; },
			get MapMemoToArray() { return mapMemoToArray; },
			get RegExEscape() { return regExEscape; },
			get RestoreFilter() { return restoreFilter; },
			get DateLongFormat() { return _dateLongFormat; },
			get GetNowDateTime() { return _getNowDateTime; }
		};
	});