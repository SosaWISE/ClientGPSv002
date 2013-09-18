define([
  'route'
], function(Route) {
  "use strict";

  describe('Route', function() {
    var route;
    beforeEach(function() {
      route = Route.create({
        goToRoute: function() {},
      }, 'devices', ':tab/:id/:action', {
        tab: 'index',
        id: '',
        action: 'view',
      }, {
        setRoute: function() {},
      });
    });

    it('should have `router` property', function() {
      expect(route.router).toBeDefined();
    });
    it('should have `name` property', function() {
      expect(route.name).toBeDefined();
    });
    it('should have `defaultRouteData` property', function() {
      expect(route.defaultRouteData).toBeDefined();
    });
    it('should have `controller` property', function() {
      expect(route.controller).toBeDefined();
    });
    it('should parse route path into `regx` and `parts` properties', function() {
      expect(route.regx).toBeDefined();
      expect(route.parts).toBeDefined();
    });
    it('`regx` property should be a RexExp with expected value', function() {
      expect(route.regx instanceof RegExp).toBe(true);
      expect(route.regx.toString()).toBe('/^(\/devices)(\/[^\/]*)?(\/[^\/]*)?(\/[^\/]*)?$/');
    });
    it('`parts` property should be an array with expected values', function() {
      expect(Array.isArray(route.parts)).toBe(true);
      expect(route.parts.length).toBe(4);
      expect(route.parts[0]).toEqual('route');
      expect(route.parts[1]).toEqual('tab');
      expect(route.parts[2]).toEqual('id');
      expect(route.parts[3]).toEqual('action');
    });

    describe('getRouteData', function() {
      it('should match expected', function() {
        var params = route.getRouteData('/devices/events/1/edit');
        expect(params).toEqual({
          route: 'devices',
          tab: 'events',
          id: '1',
          action: 'edit',
        });
      });
      it('should add default params', function() {
        var params = route.getRouteData('/devices');
        expect(params).toEqual({
          route: 'devices',
          tab: 'index',
          id: '',
          action: 'view',
        });
      });
    });
    describe('toPath', function() {
      it('should match expected', function() {
        var path = route.toPath({
          route: 'devices',
          tab: 'events',
          id: '10',
          action: 'edit',
        });
        expect(path).toBe('/devices/events/10/edit');
      });
      it('should NOT add default params (except for `route`)', function() {
        var path = route.toPath({
          // route: 'devices',
          tab: 'events',
          id: '10',
          // action: 'edit',
        });
        expect(path).toBe('/devices/events/10');
      });
    });
  });
});
