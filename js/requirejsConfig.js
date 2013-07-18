var require = {
	// by default load any module from this path
	baseUrl: 'js/app',

	// defines where each is located. does NOT load/require them
	paths: {
		jquery: '../lib/jquery-1.7.2',
		ko: '../lib/knockout-2.2.1',
		"knockout.activity": '../lib/knockout.activity',
		"knockout.asyncCommand": '../lib/knockout.asyncCommand',
		"knockout.dirtyFlag": '../lib/knockout.dirtyFlag',
		"knockout.validation": '../lib/knockout.validation',
		"koExternalTemplateEngine": '../lib/koExternalTemplateEngine',
		amplify: '../lib/amplify.core', // Handler events, and also browser storage.
		"amplify.request": '../lib/amplify.request',
		"amplify.store": '../lib/amplify.store',
		infuser: '../lib/infuser', // Template loading
		moment: '../lib/moment', // Used for Date object
		sammy: '../lib/sammy-0.7.1', // Allows us to uniquely assign a URL to parts of the app.
		toastr: '../lib/toastr', // Used for simple notification.
		underscore: '../lib/underscore', // Allows for excellent data manipulation like linq in C#.

		trafficCop: '../lib/TrafficCop',
		json2: '../lib/json2',
		mockjson: '../lib/jquery.mockjson',
	},

	// defines global names(exports) and file dependencies (deps). does NOT load/require them
	shim: {
		amplify: { exports: 'amplify' },
		infuser: { exports: 'infuser', deps: ['trafficCop','jquery'], },
		underscore: { exports: '_' },
		"knockout.activity": { deps: ['ko','jquery'], },
		"knockout.asyncCommand": { deps: ['ko'], },
		"knockout.dirtyFlag": { deps: ['ko'], },
		"knockout.validation": { deps: ['ko'], },
		"koExternalTemplateEngine": { deps: ['ko','infuser'], },
		"amplify.request": { deps: ['amplify'], },
		"amplify.store": { deps: ['amplify'], },
	}
};
