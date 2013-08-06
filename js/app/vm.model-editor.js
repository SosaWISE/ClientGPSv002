define(['messenger','datacontext','ko'],
function (messenger, datacontext, ko) {
// wrap in create function in order to create multiple instances
return (function create() {
	var
	/** START Private Properties. */
	model = ko.observable(null),
	focusField = ko.observable(false),
	editing = ko.observable(false),
	origValues,
	/**   END Private Properties. */

	start = function (currModel) {
		if (editing()) {
			return;
		}

		origValues = {};
		Object.keys(currModel).forEach(function (key) {
			// only save observable fields
			var field = currModel[key];
			if (ko.isObservable(field) &&
				!ko.isComputed(field)) {
				origValues[key] = field();
			}
		});

		model(currModel);
		focusField(true);
		editing(true);
	},
	stop = function (cancel) {
		if (cancel) {
			var currModel = model();
			Object.keys(origValues).forEach(function (key) {
				// assumes each is an observable
				currModel[key](origValues[key]);
			});
		}
		//model(null); // messes with view model
		//focusField(false); // it should've already lost focus
		editing(false);
	};

	/** Return object. */
	//noinspection JSUnusedGlobalSymbols
	return {
		create: create,
		model: model,
		focusField: focusField,
		editing: editing,
		start: start,
		stop: stop,
	};
})();
});
