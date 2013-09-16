define([
	'route'
], function(Route) {
	"use strict";

	function Router() {
		this.routes = [];
		this.routeMap = {};
	}

	Router.prototype.addRoute = function(routeName, routePath, defaultParams, controller) {
		var route = Route.create(routePath, defaultParams, controller);
		this.routes.push(route);
		if (this.routeMap[routeName]) {
			throw new Error('route named `' + routeName + '` already exists');
		}
		this.routeMap[routeName] = route;
	};

	Router.prototype.goToPath = function(path) {
		var route, params;
		// find the first route that returns params
		this.routes.some(function(testRoute) {
			params = testRoute.getParams(path);
			if (params) {
				route = testRoute;
				return true;
			}
		});

		if (!route || !params) {
			//@TODO: use default route
			route = this.routes[this.routes.length - 1];
			params = {};
		}

		// activate the route with the params
		// the result is the actual path the was chosen
		path = route.activate(params);

		// set path in address bar
		this._ignoreHashChange = true;
		location.hash = path;
		this._ignoreHashChange = false;

		return path;
	};
	Router.prototype.goToRoute = function(routeName, params) {
		var route = this.routeMap[routeName];
		if (!route) {
			throw new Error('route named `' + routeName + '` doesn\'t exist');
		}
		return this.goToPath(route.toPath(params));
	};

	Router.prototype.init = function() {
		var _this = this;

		function onHashChange() {
			if (_this._ignoreHashChange) {
				return;
			}

			var hash = location.hash;
			if (hash && hash.length) {
				// remove # from front
				hash = hash.substr(1);
			}
			_this.goToPath(hash);
		}

		// go to initial route, then listen for the route to change
		onHashChange();
		window.addEventListener('hashchange', onHashChange);
	};

	Router.instance = new Router();
	return Router;
});
