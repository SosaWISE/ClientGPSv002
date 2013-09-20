/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/13/13
 * Time: 11:12 AM
 * To change this template use File | Settings | File Templates.
 */
(function() {
  "use strict";

  // load main libs
  define(['jquery', 'ko'], function(jquery, ko) {
    // manually set the global properties for the plugins below
    window.jQuery = jquery;
    window.ko = ko;

    /* Plugins must be loaded after jQuery and Knockout,
     * since they depend on them.  */
    require([
      'ko.bindingHandlers',
      'ko.debug.helpers',
      'ko.command',

      'knockout.activity',
      'knockout.dirtyFlag',
      'koExternalTemplateEngine',

      'amplify.request',
      'amplify.store',

      'json2',
      'mockjson',
    ], function() {
      console.log('done loadDependencies');
    });
  });

  // define gmaps
  define('gmaps', ['async!https://maps.google.com/maps/api/js?v=3.12&libraries=geometry&sensor=false'], function() {
    return window.google.maps;
  });

})();
