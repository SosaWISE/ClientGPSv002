define([], function() {
  "use strict";

  function Route(router, name, regx, parts, defaultRouteData, controller) {
    this.router = router;
    this.name = name;
    this.regx = regx;
    this.parts = parts;
    this.defaultRouteData = defaultRouteData || {};
    this.defaultRouteData.route = name;
    this.controller = controller;
    controller.setRoute(this);
  }
  Route.create = function(router, name, routePath, defaultRouteData, controller) {
    // make regx and parts from routePath
    var regxParts = [],
      parts = [];

    // anchor match to start of string
    regxParts.push('^');

    // literally match route name
    regxParts.push('(\/' + name + ')');
    parts.push('route');

    routePath.split('/').forEach(function(name) {
      if (!name) {
        // starting slash or empty routePath can make an empty name
        return;
      }
      if (name[0] !== ':') {
        throw new Error('name must start with a colon');
      }

      regxParts.push('(\/[^\/]*)?');
      parts.push(name.substr(1)); // remove colon
    });

    // anchor match to end of string
    regxParts.push('$');

    return new Route(router, name, new RegExp(regxParts.join('')), parts, defaultRouteData, controller);
  };
  Route.prototype.goTo = function(routeData, allowHistory) {
    this.addDefaults(routeData);
    this.router.goToRoute(this.name, routeData, allowHistory);
  };
  Route.prototype.setRouteData = function(routeData) {
    this.addDefaults(routeData);
    var path = this.toPath(routeData);
    this.router.setPath(path);
  };
  Route.prototype.getRouteData = function(path) {
    var matches = this.regx.exec(path),
      routeData;
    if (matches) {
      routeData = {};
      this.parts.some(function(part, index) {
        var match = matches[index + 1];
        if (match) {
          routeData[part] = match.substr(1);
        }
      });
      this.addDefaults(routeData);
      return routeData;
    }
  };
  Route.prototype.toPath = function(routeData) {
    var pathParts = [],
      routeName = this.name;
    // add an empty string to prefix the path with a slash
    pathParts.push('');
    this.parts.some(function(part) {
      var val = routeData[part];
      if (isNullOrEmpty(val)) {
        if (part === 'route') {
          val = routeName;
        } else {
          // break out of loop when no value is found
          return true;
        }
      }
      // add val to path
      pathParts.push(val);
    });
    // merge parts into path
    return pathParts.join('/');
  };
  Route.prototype.addDefaults = function(routeData) {
    var defaultRouteData = this.defaultRouteData;
    this.parts.forEach(function(part) {
      if (isNullOrEmpty(routeData[part])) {
        // route value not set, so set to default value
        routeData[part] = defaultRouteData[part];
      }
    });
  };
  Route.prototype.deactivate = function() {
    this.disposeOnLoaded();
    this.controller.deactivate();
  };
  Route.prototype.disposeOnLoaded = function() {
    if (this.onLoaded) {
      this.onLoaded.dispose();
      this.onLoaded = null;
    }
  };
  Route.prototype.activate = function(path, cb) {
    var routeData = this.getRouteData(path);
    if (routeData) {
      // the path matches this route so we can activate it
      activateRoute(this, routeData, cb);
    }
    // true if this route has been activated
    return !!routeData;
  };

  function isNullOrEmpty(str) {
    return str == null || str.length === 0;
  }

  function activateRoute(route, routeData, cb) {
    // ensure the previous has been disposed
    route.disposeOnLoaded();

    function activateController() {
      // we only needed it for one event
      route.disposeOnLoaded();
      // the controller modifies the routeData to fit what it has
      route.controller.activate(routeData);
      // return the path taken
      cb(route.toPath(routeData));
    }

    if (!route.controller.loaded()) {
      // store the subscription to loaded
      route.onLoaded = route.controller.loaded.subscribe(activateController);
      route.controller.load();
    } else {
      activateController();
    }
  }

  return Route;
});
