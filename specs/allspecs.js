define([
  '../js/loadDependencies'
], function() {
  require([

    '../../specs/app/spec.dataservice.base',
    '../../specs/app/spec.notify',
    '../../specs/app/spec.route',
    '../../specs/app/spec.router',
    '../../specs/app/spec.util.strings',
    '../../specs/app/spec.vm.devices',

  ], function() {
    'use strict';

    var jasmineEnv = jasmine.getEnv(),
      htmlReporter;

    jasmineEnv.updateInterval = 1000;
    htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    jasmineEnv.execute();
  });
});
