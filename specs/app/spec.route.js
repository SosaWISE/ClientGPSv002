define([
	'route'
], function(Route) {
	"use strict";

	describe('Route', function() {
		var route;
		beforeEach(function() {
			route = Route.create('/devices/:tab/:id/:action', {
				tab: 'index',
				id: '',
				action: 'view',
			});
		});

		// it('should have `name` property', function() {
		// 	expect(route.name).toBeDefined();
		// 	expect(route.name).toBe('name1');
		// });
		it('should have `defaultParams` property', function() {
			expect(route.defaultParams).toBeDefined();
		});
		// it('should have `controller` property', function() {
		// 	expect(route.controller).toBeDefined();
		// });
		it('should parse route path into `regx` and `parts` properties', function() {
			expect(route.regx).toBeDefined();
			expect(route.parts).toBeDefined();
		});
		it('`regx` property should be a RexExp with expected value', function() {
			expect(route.regx instanceof RegExp).toBe(true);
			expect(route.regx.toString()).toBe('/(\/devices)(\/[^\/]*)?(\/[^\/]*)?(\/[^\/]*)?/');
		});
		it('`parts` property should be an array with expected values', function() {
			expect(Array.isArray(route.parts)).toBe(true);
			expect(route.parts.length).toBe(4);
			expect(route.parts[0]).toEqual({
				name: 'devices',
				isColon: false,
			});
			expect(route.parts[1]).toEqual({
				name: 'tab',
				isColon: true,
			});
			expect(route.parts[2]).toEqual({
				name: 'id',
				isColon: true,
			});
			expect(route.parts[3]).toEqual({
				name: 'action',
				isColon: true,
			});
		});

		it('getParams() result should match expected', function() {
			var path = route.getParams('/devices/events/1/view');
			expect(path).toEqual({
				tab: 'events',
				id: '1',
				action: 'view',
			});
		});
		it('toPath() result should match expected', function() {
			var path = route.toPath({
				tab: 'events',
				id: '10',
				// action: 'edit',
			});
			expect(path).toBe('/devices/events/10/view');
		});
	});
});
