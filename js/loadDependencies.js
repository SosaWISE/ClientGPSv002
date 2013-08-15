/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/13/13
 * Time: 11:12 AM
 * To change this template use File | Settings | File Templates.
 */
(function () {
	/** Initialize. */
	var root = this;

	// load main libs
	define(['jquery','ko'],
	function (jquery, ko) {
		// manually set the global properties for plugins below
		root.jQuery = jquery;
		root.ko = ko;

		/* Plugins must be loaded after jQuery and Knockout,
		 * since they depend on them.  */
		require([
			'ko.bindingHandlers',
			'ko.debug.helpers',

			'knockout.activity',
			'knockout.asyncCommand',
			'knockout.dirtyFlag',
			// 'knockout.validation',
			'koExternalTemplateEngine',

			'amplify.request',
			'amplify.store',

			'json2',
			'mockjson',
		], function () {
			console.log('done loadDependencies');
		});
	});

	// define gmaps
	define('gmaps',
	['async!https://maps.google.com/maps/api/js?v=3.12&libraries=geometry&sensor=false'],
	function () {
		return window.google.maps;
	});

})();
