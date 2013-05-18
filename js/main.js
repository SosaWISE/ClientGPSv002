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
	define3rdPartyModules();
	loadPluginsAndBoot();

	function define3rdPartyModules() {
		/* These are already loaded via bundles.
		* We define them and put them in the root object. */
		define('jquery', [], function () { return root.jQuery; });
		define('ko', [], function () { return root.ko; });  // Knockout
		define('amplify', [], function () { return root.amplify; });  // Handler events, and also browser storage.
		define('infuser', [], function () { return root.infuser; });  // Template loading
		define('moment', [], function () { return root.moment; });  // Used for Date object
		define('sammy', [], function () { return root.Sammy; }); // Allows us to uniquely assign a URL to parts of the app.
		define('toastr', [], function () { return root.toastr; }); // Used for simple notification.
		define('underscore', [], function () { return root._; }); // Allows for excellent data manipulation like linq in C#.
 	}
	function loadPluginsAndBoot() {
		/* Plugins must be loaded after jQuery and Knockout,
		 * since they depend on them.  */
		requirejs([
			'ko.bindingHandlers',
			'ko.debug.helpers'
		], boot);
 	}
	 function boot() {
		 require(['bootstrapper'], function (bs) { bs.run(); });
	 }
})();