/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/13/13
 * Time: 11:12 AM
 * To change this template use File | Settings | File Templates.
 */
(function() {
  "use strict";

  // define gmaps
  define('gmaps', ['async!https://maps.google.com/maps/api/js?v=3.12&libraries=geometry&sensor=false'], function() {
    return window.google.maps;
  });

  // load main libs
  define(['jquery', 'ko'], function(jquery, ko) {
    // manually set the global properties for the plugins below
    window.jQuery = jquery;
    window.ko = ko;

    // now load plugins that depend on jQuery and Knockout
    require([
      'gmaps', // eager load gmaps

      'knockout.activity',
      'ko.debug.helpers',

      'ko.command',
      'ko.bindingHandlers',
      'koExternalTemplateEngine'
    ], function() {
      console.log('done loadDependencies');
    });
  });

})();
